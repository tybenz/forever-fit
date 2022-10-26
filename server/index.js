// server.js
import express from "express";
import http from "http";
import cors from "cors";
import AWS from "aws-sdk";

const s3 = new AWS.S3();

const app = express();
app.use(express.json());
app.use(cors());

const env = process.env.ENV || 'local';

const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

const fetchUsers = () => {
    return new Promise((resolve, reject) => {
        console.log(`S3 GETTING: 'db-${env}.json'`);
        s3.getObject(
            {
                Bucket: 'forever-fit-db',
                Key: `db-${env}.json`
            },
            (err, data) => {
                if (err) {
                    reject(err);
                }
                console.log(`S3 GOT: 'db-${env}.json'`);
                try {
                    const users = JSON.parse(data.Body.toString('utf-8')).users;
                    resolve(users);
                } catch (err) {
                    reject(err);
                }
            }
        );
    });
};

const pushUsers = async (changeFn) => {
    const users = await fetchUsers();

    changeFn(users);

    return new Promise((resolve, reject) => {
        console.log(`S3 UPDATING: 'db-${env}.json'`);
        s3.putObject(
            {
                Bucket: 'forever-fit-db',
                Key: `db-${env}.json`,
                Body: JSON.stringify({ users }),
                ContentType: 'application/json'
            },
            (err, data) => {
                if (err) {
                    reject(err);
                }
                console.log(`S3 UPDATED: 'db-${env}.json'`);
                resolve();
            }
        );
    });
};

app.get('/users', async (req, res, next) => {
    try {
        console.log("GET USERS");
        const users = await fetchUsers();
        console.log("GOT USERS - LENGTH: " + users.length);
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
});

app.get('/users/:phoneNumber', async (req, res, next) => {
    try {
        console.log("GET USER: " + req.params.phoneNumber);
        const users = await fetchUsers();
        console.log(JSON.stringify(users));
        const user = users.find((u) => u.phoneNumber === req.params.phoneNumber);
        if (user) {
            console.log("GOT USER: " + JSON.stringify(user));
            res.status(200).send(user);
            return;
        }
        res.sendStatus(404);
    } catch (err) {
        next(err);
    }
});

app.post('/users', async (req, res, next) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        console.log("CREATE USER: " + phoneNumber);
        const params = ['phoneNumber', 'days', 'start', 'startTimezone', 'currentStreak', 'maxStreak'];
        const user = pick(req.body, params);
        await pushUsers((users) => {
            const existingUser = users.find((u) => u.phoneNumber === phoneNumber);
            if (existingUser) {
                throw new Error('user already exists');
            } else {
                users.push(user);
            }
        });
        console.log("USER ADDED: " + phoneNumber);
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});

app.put('/users/:phoneNumber', async (req, res, next) => {
    try {
        const phoneNumber = req.params.phoneNumber;
        console.log("UPDATE USER: " + phoneNumber);
        await pushUsers((users) => {
            let user = users.find((u) => u.phoneNumber === phoneNumber);
            const params = ['phoneNumber', 'days', 'start', 'startTimezone', 'currentStreak', 'maxStreak'];
            if (!user) {
                throw new Error('user w/ phoneNumber ' + phoneNumber + ' does not exist');
            } else {
                // patch user w/ body
                const userParamsFromBody = pick(req.body, params);
                params.forEach((key) => {
                    user[key] = userParamsFromBody[key];
                });
            }
        });
        console.log("UPDATED USER: " + phoneNumber);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

app.use((err) => {
    if (err && err.status) {
        res.sendStatus(err.status);
    }
    res.sendStatus(500);
});

const server = http.createServer( app );

server.listen( process.env.PORT || 3001, function() {
    console.log("SERVER STARTED UP");
});

export default server;
