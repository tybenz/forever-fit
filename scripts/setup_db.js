#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'db', 'db.json');

// if (!fs.existsSync(dbPath)) {
fs.writeFileSync(dbPath, JSON.stringify({ users: [
    {
      "phoneNumber": "2095813944",
      "days": [
        {
          "date": "2022-08-01T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-02T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-03T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-04T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-05T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-06T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-07T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-08T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-09T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-10T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-11T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-12T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-13T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-14T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-15T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-16T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-17T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-18T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-19T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-20T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-21T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-22T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-23T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-24T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-25T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-26T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-27T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-28T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-29T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-30T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-31T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-01T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-02T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-03T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-04T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-05T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-06T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-07T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-08T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-09T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-10T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-11T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-12T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-13T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-14T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-15T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-16T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-17T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-18T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-19T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-20T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-21T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-22T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-23T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-24T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-25T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-26T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        }
      ],
      "start": "2022-08-01T07:00:00.000Z",
      "startTimezone": "America/Los_Angeles",
      "currentStreak": 56,
      "maxStreak": 56,
      "id": 1
    },
    {
      "phoneNumber": "2096142267",
      "days": [
        {
          "date": "2022-08-01T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-02T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-03T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-04T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-05T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-06T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-07T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-08T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-09T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-10T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-11T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-12T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-13T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-14T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-15T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-16T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-17T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-18T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-19T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-20T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-21T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-22T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-23T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-24T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-25T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-26T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-27T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-28T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-29T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-30T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-08-31T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-01T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-02T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-03T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-04T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-05T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-06T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-07T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-08T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-09T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-10T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-11T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-12T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-13T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-14T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-15T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-16T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-17T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-18T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-19T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-20T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-21T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-22T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-23T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-24T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-25T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        },
        {
          "date": "2022-09-26T07:00:00.000Z",
          "didWorkout": true,
          "didRead": true,
          "didDrinkWater": true,
          "noCheatMeals": true
        }
      ],
      "start": "2022-08-01T07:00:00.000Z",
      "startTimezone": "America/Los_Angeles",
      "currentStreak": 56,
      "maxStreak": 56,
      "id": 2
    }
] }));
// }
