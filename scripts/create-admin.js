/*
 * Create (or promote) an ADMIN user for the Education Portal admin panel.
 *
 * Usage (run inside the `server` folder, where node_modules has argon2/mongoose):
 *   node scripts/create-admin.js <email> <password> [name]
 *
 * MONGO_URI is read from server/.env automatically, or you can pass it inline:
 *   MONGO_URI="mongodb+srv://..." node scripts/create-admin.js admin@site.com "StrongPass123" "Admin"
 */
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const argon2 = require('argon2');

// Load server/.env (no extra dependency needed)
(function loadEnv() {
  try {
    const txt = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
      }
    }
  } catch (e) {}
})();

async function main() {
  const [, , mail, password, name = 'Admin'] = process.argv;
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error('MONGO_URI not found. Add it to server/.env or pass it inline before the command.');
    process.exit(1);
  }
  if (!mail || !password) {
    console.error('Usage: node scripts/create-admin.js <email> <password> [name]');
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  const users = mongoose.connection.collection('users');

  const hashed = await argon2.hash(password); // same algo the app uses
  const now = new Date();
  const existing = await users.findOne({ mail });

  if (existing) {
    await users.updateOne(
      { _id: existing._id },
      { $set: { name, password: hashed, role: 'admin', status: 'active', verificationStatus: 'verified', updatedAt: now } }
    );
    console.log('Existing user promoted to ADMIN:', mail);
  } else {
    await users.insertOne({
      name, mail, password: hashed,
      role: 'admin', status: 'active', verificationStatus: 'verified',
      createdAt: now, updatedAt: now,
    });
    console.log('Admin user created:', mail);
  }

  await mongoose.disconnect();
  console.log('Done. Login to the admin panel with this email + password.');
}

main().catch((e) => { console.error(e); process.exit(1); });
