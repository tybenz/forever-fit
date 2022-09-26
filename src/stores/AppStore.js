import Settings from '../settings';
import moment from 'moment';
import 'moment-timezone';

const host = Settings.get('apiHost');

export default class AppStore {
    constructor() {
        let phoneNumber;

        try {
            phoneNumber = localStorage.getItem('userPhoneNumber');
        } catch (err) {
        }

        this.phoneNumber = phoneNumber || undefined;
    }

    _didUpdate() {
        const updateEvent = new Event('app-store-did-update');
        updateEvent.detail = { appStore: this };
        window.dispatchEvent(updateEvent);
    }

    async load() {
        if (!this.phoneNumber) {
            return new Promise((r) => {
                this._didUpdate();
                r(false);
            });
        }

        return fetch(`${host}/users/?phoneNumber=${this.phoneNumber}`).then(async (res) => {
            if (res.status !== 200) {
                return false;
            }

            const userList = await res.json();

            if (!userList || !userList.length) {
                this._didUpdate();
                return false;
            }

            const user = userList[0];

            this.id = user.id;
            this.phoneNumber = user.phoneNumber;
            this.days = user.days;
            this.start = user.start;
            this.startTimezone = user.startTimezone;
            this.currentStreak = user.currentStreak;
            this.maxStreak = user.maxStreak;

            this._didUpdate();
            return true;
        });
    }

    async setupUser(phoneNumber) {
        this.phoneNumber = phoneNumber;

        const userDidLoad = await this.load();

        if (userDidLoad) {
            this.backupUser(phoneNumber);
            this._didUpdate();
            return;
        }

        return fetch(`${host}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phoneNumber,
                days: [],
                start: false,
                startTimezone: false,
                currentStreak: 0,
                maxStreak: 0
            })
        }).then(async (res) => {
            const user = await res.json();

            this.id = user.id;
            this.phoneNumber = phoneNumber;
            this.days = [];
            this.start = false;
            this.startTimezone = false;
            this.currentStreak = 0;
            this.maxStreak = 0;
            this.backupUser(phoneNumber);
            this._didUpdate();
        });
    }

    async updateUserRecord() {
        return fetch(`${host}/users/${this.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                phoneNumber: this.phoneNumber,
                days: this.days,
                start: this.start,
                startTimezone: this.startTimezone,
                currentStreak: this.currentStreak,
                maxStreak: this.maxStreak
            })
        });
    }

    async startChallenge() {
        if (!this.phoneNumber) {
            throw new Error('Missing selected user/phone-number');
        }

        const today = moment().toISOString();
        const timezone = moment.tz.guess();

        this.start = today;
        this.startTimezone = timezone;

        return this.updateUserRecord();
    }

    challengeIsUnderway() {
        // handle weird error
        const today = moment();
        if (this.start >= today) {
            this.start = false;
            return false;
        }
        return !!this.start;
    }

    isTodayComplete() {
        const timezone = this.startTimezone;
        const mostRecentlyLoggedDay = this.days[this.days.length - 1];
        const mostRecentlyLoggedDateStr = mostRecentlyLoggedDay.date;
        const mostRecentlyLoggedDate = moment.tz(mostRecentlyLoggedDateStr, timezone);
        const today = moment.tz(moment(), timezone);
        return today.diff(mostRecentlyLoggedDate, 'days') === 0;
    }

    getTodayFromCache() {
        var today;
        try {
            var str = localStorage.getItem(`today:${this.phoneNumber}`);
            today = JSON.parse(str);
        } catch (err) {
        }
        this.today = today;

        this._didUpdate();
        return today;
    }

    getToday() {
        var today = this.today || this.getTodayFromCache();
        return today;
    }

    backupUser(phoneNumber) {
        try {
            localStorage.setItem('userPhoneNumber', phoneNumber);
        } catch (err) {
            console.log('Could not back-up current data to localStorage ' + err);
        }
    }

    backupToday() {
        var day = this.getToday();
        try {
            localStorage.setItem(`today:${this.phoneNumber}`, JSON.stringify(day));
        } catch (err) {
            console.log('Could not back-up current data to localStorage ' + err);
        }
    }

    checkDidWorkout() {
        var today = this.getToday();
        today.didWorkout = true;
        this.backupToday();
    }

    checkDidDrinkWater() {
        var today = this.getToday();
        today.didDrinkWater = true;
        this.backupToday();
    }

    checkDidRead() {
        var today = this.getToday();
        today.didRead = true;
        this.backupToday();
    }

    checkNoCheatMeals() {
        var today = this.getToday();
        today.noCheatMeals = true;
        this.backupToday();
    }

    completedToday(day) {
        console.log(day);
        // push in-memory today into days array
        // increment current streak
            // if currentStreak > maxStreak, then set maxStreak equal to currentStreak

        // push entire user to DB
        // clear localStorage for today
    }

    failedToday(day) {
        console.log(day);
        // if currentStreak > maxStreak, then set maxStreak equal to currentStreak

        // push entire user to DB
        // clear localStorage for today
    }
}
