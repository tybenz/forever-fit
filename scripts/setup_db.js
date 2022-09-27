#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'db', 'db.json');

if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }));
}
