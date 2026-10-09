import fs from 'fs';
import path from 'path';
import sqlite3 from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const DB_PATH = path.join(process.cwd(), 'data', 'growthcapital.db');

export function getDb() {
  if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  }
  return new sqlite3(DB_PATH);
}

export function ensureDatabaseReady() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      phone TEXT UNIQUE,
      email TEXT UNIQUE,
      password_hash TEXT NOT NULL,
      balance REAL DEFAULT 0,
      status TEXT DEFAULT 'active',
      referral_code TEXT,
      referral_link TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'ADMIN',
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS deposits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      amount REAL,
      method TEXT,
      proof TEXT,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      approved_by INTEGER,
      rejection_reason TEXT
    );

    CREATE TABLE IF NOT EXISTS withdrawals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      amount REAL,
      method TEXT,
      account_name TEXT,
      bank TEXT,
      iban TEXT,
      phone TEXT,
      notes TEXT,
      fee REAL DEFAULT 0,
      received_amount REAL DEFAULT 0,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      processed_by INTEGER
    );

    CREATE TABLE IF NOT EXISTS investment_packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      min_amount REAL,
      max_amount REAL,
      duration_days INTEGER,
      daily_return REAL,
      total_return REAL,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS investments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      package_id INTEGER,
      package_name TEXT,
      amount REAL,
      start_date TEXT,
      end_date TEXT,
      status TEXT DEFAULT 'active',
      credited REAL DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      type TEXT,
      amount REAL,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      details TEXT
    );

    CREATE TABLE IF NOT EXISTS affiliate_referrals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      referred_by INTEGER,
      referral_code TEXT,
      referral_link TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS affiliate_commissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      referred_user_id INTEGER,
      amount REAL,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      body TEXT,
      is_read INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      admin_id INTEGER,
      action TEXT,
      details TEXT,
      ip TEXT,
      result TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS system_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE,
      value TEXT
    );
  `);

  const packageCount = db.prepare('SELECT COUNT(*) as total FROM investment_packages').get().total;
  if (packageCount === 0) {
    db.prepare(`
      INSERT INTO investment_packages (name, min_amount, max_amount, duration_days, daily_return, total_return, status)
      VALUES
      ('STARTER', 5000, 10000, 90, 500, 45000, 'active'),
      ('GROWTH', 15000, 25000, 90, 1000, 90000, 'active'),
      ('PREMIUM', 25000, 40000, 60, 1000, 60000, 'active'),
      ('OURO', 35000, 50000, 60, 1500, 90000, 'active'),
      ('PRATA', 50000, 80000, 50, 2000, 100000, 'active'),
      ('TESLA', 100000, 150000, 50, 5000, 250000, 'active')
    `).run();
  }

  const adminPhone = process.env.ADMIN_PHONE || '938970887';
  const adminPassword = process.env.ADMIN_PASSWORD || 'SANKARA009988';
  const adminExists = db.prepare('SELECT COUNT(*) as total FROM admins WHERE phone = ?').get(adminPhone).total;
  if (!adminExists) {
    db.prepare('INSERT INTO admins (phone, password_hash, role, status) VALUES (?, ?, ?, ?)').run(adminPhone, bcrypt.hashSync(adminPassword, 10), 'ADMIN', 'active');
  }

  const settings = db.prepare('SELECT COUNT(*) as total FROM system_settings').get().total;
  if (settings === 0) {
    db.prepare('INSERT INTO system_settings (key, value) VALUES (?, ?)').run('platform_name', 'GrowthCapital');
    db.prepare('INSERT INTO system_settings (key, value) VALUES (?, ?)').run('currency', 'KZ');
    db.prepare('INSERT INTO system_settings (key, value) VALUES (?, ?)').run('commission_rate', '5');
  }

  db.close();
}

export async function registerUser({ full_name, phone, email, password, referral_code }) {
  ensureDatabaseReady();
  const db = getDb();
  const exists = db.prepare('SELECT id FROM users WHERE phone = ? OR email = ?').get(phone, email);
  if (exists) {
    throw new Error('A user with this phone or email already exists.');
  }

  const referralCode = referral_code || `GC${Date.now().toString().slice(-6)}`;
  const referralLink = `https://growthcapital.com/register?ref=${referralCode}`;
  const row = db.prepare(`
    INSERT INTO users (full_name, phone, email, password_hash, balance, referral_code, referral_link)
    VALUES (?, ?, ?, ?, 0, ?, ?)
  `).run(full_name, phone, email, bcrypt.hashSync(password, 10), referralCode, referralLink);

  db.prepare('INSERT INTO notifications (user_id, title, body) VALUES (?, ?, ?)').run(row.lastInsertRowid, 'Welcome', 'Your account has been created successfully.');
  db.close();
  return { id: row.lastInsertRowid, full_name, phone, email, referral_code: referralCode, referral_link: referralLink };
}

export async function loginUser(identifier, password) {
  ensureDatabaseReady();
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE phone = ? OR email = ?').get(identifier, identifier);
  if (!user) throw new Error('Invalid phone or email.');
  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) throw new Error('Incorrect password.');
  db.close();
  return user;
}

export async function adminLogin(phone, password) {
  ensureDatabaseReady();
  const db = getDb();
  const admin = db.prepare('SELECT * FROM admins WHERE phone = ?').get(phone);
  if (!admin) throw new Error('Admin not found.');
  const valid = bcrypt.compareSync(password, admin.password_hash);
  if (!valid) throw new Error('Invalid admin password.');
  db.close();
  return admin;
}

export async function getPackages() {
  ensureDatabaseReady();
  const db = getDb();
  const rows = db.prepare('SELECT * FROM investment_packages WHERE status = ?', ['active']).all();
  db.close();
  return rows;
}

export async function getUserById(userId) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  db.close();
  return row;
}

export async function getUserStats(userId) {
  const db = getDb();
  const user = db.prepare('SELECT balance FROM users WHERE id = ?').get(userId);
  const totalInvested = db.prepare('SELECT COALESCE(SUM(amount), 0) AS total FROM investments WHERE user_id = ?').get(userId).total;
  const totalWithdrawn = db.prepare('SELECT COALESCE(SUM(amount), 0) AS total FROM withdrawals WHERE user_id = ? AND status = ?').get(userId, 'completed').total;
  const earnings = db.prepare('SELECT COALESCE(SUM(credited), 0) AS total FROM investments WHERE user_id = ?').get(userId).total;
  db.close();
  return {
    balance: user?.balance ?? 0,
    total_invested: totalInvested,
    total_withdrawn: totalWithdrawn,
    earnings,
  };
}

export async function getUserInvestments(userId) {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM investments WHERE user_id = ? ORDER BY created_at DESC').all(userId);
  db.close();
  return rows;
}

export async function getUserTransactions(userId) {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 20').all(userId);
  db.close();
  return rows;
}

export async function getReferralInfo(userId) {
  const db = getDb();
  const user = db.prepare('SELECT referral_code, referral_link FROM users WHERE id = ?').get(userId);
  const total_referred = db.prepare('SELECT COUNT(*) as total FROM affiliate_referrals WHERE referred_by = ?').get(userId).total;
  const active_referred = db.prepare('SELECT COUNT(*) as total FROM affiliate_referrals WHERE referred_by = ? AND status = ?').get(userId, 'active').total;
  const volume = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM affiliate_commissions WHERE user_id = ?').get(userId).total;
  const eligible = volume * 0.05;
  db.close();
  return {
    total_referred,
    active_referred,
    volume,
    eligible,
    link: user?.referral_link || 'https://growthcapital.com/register?ref=GC000000',
  };
}

export async function createDeposit({ user_id, amount, method, proof }) {
  ensureDatabaseReady();
  const db = getDb();
  const row = db.prepare('INSERT INTO deposits (user_id, amount, method, proof, status) VALUES (?, ?, ?, ?, ?)').run(user_id, amount, method, proof || '', 'pending');
  db.prepare('INSERT INTO transactions (user_id, type, amount, status, details) VALUES (?, ?, ?, ?, ?)').run(user_id, 'deposit', amount, 'pending', JSON.stringify({ deposit_id: row.lastInsertRowid }));
  db.close();
  return row.lastInsertRowid;
}

export async function createWithdrawal({ user_id, amount, method, account_name, bank, iban, phone, notes }) {
  ensureDatabaseReady();
  const db = getDb();
  const fee = Number(amount) * 0.1;
  const received = Number(amount) - fee;
  const row = db.prepare('INSERT INTO withdrawals (user_id, amount, method, account_name, bank, iban, phone, notes, fee, received_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(user_id, amount, method, account_name, bank, iban, phone, notes, fee, received, 'pending');
  db.prepare('INSERT INTO transactions (user_id, type, amount, status, details) VALUES (?, ?, ?, ?, ?)').run(user_id, 'withdrawal', amount, 'pending', JSON.stringify({ withdrawal_id: row.lastInsertRowid }));
  db.close();
  return row.lastInsertRowid;
}

export async function createInvestment({ user_id, package_id, amount, package_name }) {
  ensureDatabaseReady();
  const db = getDb();
  const startDate = new Date().toISOString();
  const endDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
  const row = db.prepare('INSERT INTO investments (user_id, package_id, package_name, amount, start_date, end_date, status, credited) VALUES (?, ?, ?, ?, ?, ?, ?, 0)').run(user_id, package_id, package_name, amount, startDate, endDate, 'active');
  db.prepare('INSERT INTO transactions (user_id, type, amount, status, details) VALUES (?, ?, ?, ?, ?)').run(user_id, 'investment', amount, 'approved', JSON.stringify({ investment_id: row.lastInsertRowid }));
  db.close();
  return row.lastInsertRowid;
}

export async function getDashboardStats() {
  ensureDatabaseReady();
  const db = getDb();
  const stats = {
    total_users: db.prepare('SELECT COUNT(*) as total FROM users').get().total,
    active_users: db.prepare('SELECT COUNT(*) as total FROM users WHERE status = ?').get('active').total,
    suspended_users: db.prepare('SELECT COUNT(*) as total FROM users WHERE status = ?').get('suspended').total,
    total_deposited: db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM deposits WHERE status = ?').get('approved').total,
    total_withdrawn: db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM withdrawals WHERE status IN (?, ?)').get('approved', 'completed').total,
    total_invested: db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM investments WHERE status = ?').get('active').total,
    total_transactions: db.prepare('SELECT COUNT(*) as total FROM transactions').get().total,
    affiliate_commissions: db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM affiliate_commissions').get().total,
  };
  db.close();
  return stats;
}

export async function getSystemSettings() {
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM system_settings').all();
  const map = Object.fromEntries(rows.map((item) => [item.key, item.value]));
  db.close();
  return map;
}

export async function addAuditLog({ user_id, admin_id, action, details, ip, result }) {
  const db = getDb();
  db.prepare('INSERT INTO audit_logs (user_id, admin_id, action, details, ip, result) VALUES (?, ?, ?, ?, ?, ?)').run(user_id ?? null, admin_id ?? null, action, details, ip ?? 'unknown', result ?? 'success');
  db.close();
}

export async function ensureDatabaseReady() {
  // wrapper exported for route usage
  return true;
}

export function getDbFilePath() {
  return DB_PATH;
}
