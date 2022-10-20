#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'db', 'db.json');

fs.writeFileSync(dbPath, JSON.stringify({users: []}));

console.log(fs.readFileSync(dbPath, 'utf8'));
