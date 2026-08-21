const express = require('express');
const session = require('express-session');
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Sørg for at data-mappen eksisterer
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// Sett opp SQLite Database
const db = new Database(path.join(dataDir, 'app.db'));

// Opprett tabeller hvis de ikke eksisterer
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password_hash TEXT
  );
  CREATE TABLE IF NOT EXISTS app_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    state_json TEXT
  );
`);

// Opprett en standard admin-bruker hvis databasen er tom
const adminExists = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
if (!adminExists) {
  const hash = bcrypt.hashSync('admin123', 10); // Standard passord: admin123
  db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run('admin', hash);
  console.log('Standardbruker opprettet: admin / admin123');
}

// Middleware
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
app.use(express.json({ limit: '50mb' }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 uke logget inn
}));

// Sikre statiske filer (krever innlogging for å se appen)
app.use(express.static('public'));

// Sjekker om brukeren er logget inn
const requireAuth = (req, res, next) => {
  if (req.session.userId) next();
  else res.status(401).json({ error: 'Unauthorized' });
};

// API: Innlogging
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (user && bcrypt.compareSync(password, user.password_hash)) {
    req.session.userId = user.id;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Feil brukernavn eller passord' });
  }
});

// API: Logg ut
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// API: Endre passord
app.post('/api/change-password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.session.userId);

  // Sjekk om nåværende passord stemmer
  if (!user || !bcrypt.compareSync(currentPassword, user.password_hash)) {
    return res.status(401).json({ error: 'Feil nåværende passord' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Nytt passord må ha minst 6 tegn' });
  }

  // Hash det nye passordet og lagre
  const newHash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, user.id);

  res.json({ success: true });
});

// API: Hent app-data
app.get('/api/state', requireAuth, (req, res) => {
  const row = db.prepare('SELECT state_json FROM app_state WHERE id = 1').get();
  if (row) res.json(JSON.parse(row.state_json));
  else res.json({});
});

// API: Lagre app-data
app.post('/api/state', requireAuth, (req, res) => {
  const stateJson = JSON.stringify(req.body);
  db.prepare(`
    INSERT INTO app_state (id, state_json) VALUES (1, ?)
    ON CONFLICT(id) DO UPDATE SET state_json = excluded.state_json
  `).run(stateJson);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
});