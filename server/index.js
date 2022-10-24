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
        s3.getObject(
            {
                Bucket: 'forever-fit-db',
                Key: `db-${env}.json`
            },
            (err, data) => {
                if (err) {
                    reject(err);
                }
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
                resolve();
            }
        );
    });
};

app.get('/users', async (req, res, next) => {
    try {
        const users = await fetchUsers();
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
});

app.get('/users/:phoneNumber', async (req, res, next) => {
    try {
        const users = await fetchUsers();
        const user = users.find((u) => u.phoneNumber === req.params.phoneNumber);
        if (user) {
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
        await pushUsers((users) => {
            let user = users.find((u) => u.phoneNumber = phoneNumber);
            if (!user) {
                const err = new Error('Not found');
                err.status = 404;
                throw err;
            }

            const params = ['phoneNumber', 'days', 'start', 'startTimezone', 'currentStreak', 'maxStreak'];
            if (user) {
                throw new Error('user already exists');
            } else {
                const userParamsFromBody = pick(req.body, params);
                user = userParamsFromBody;
                users.push(user);
            }
        });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

app.put('/users/:phoneNumber', async (req, res, next) => {
    const phoneNumber = req.params.phoneNumber;
    pushUsers((users) => {
        let user = users.find((u) => u.phoneNumber = phoneNumber);
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
    })
    .then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        console.error(err);
        next(err);
    });
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
