#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'db', 'db.json');

// if (!fs.existsSync(dbPath)) {
fs.writeFileSync(dbPath, JSON.stringify({ users: [
    {
      "phoneNumber": "2095813944",
      "days": [
      ],
      "start": false,
      "startTimezone": false,
      "currentStreak": 0,
      "maxStreak": 0,
      "id": 1
    },
    {
      "phoneNumber": "2096142267",
      "days": [
      ],
      "start": false,
      "startTimezone": false,
      "currentStreak": 0,
      "maxStreak": 0,
      "id": 2
    }
] }));
// }
