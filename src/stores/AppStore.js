// import Settings from '../settings';
import moment from 'moment';
import 'moment-timezone';

// const host = Settings.get('apiHost');
const host = `http://${window.location.hostname}:3001`;

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

        const timezone = moment.tz.guess();
        const today = moment.tz(moment().startOf('day'), timezone).toISOString();

        this.start = today;
        this.startTimezone = timezone;

        return this.updateUserRecord().then(() => {
            this._didUpdate();
        });
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

    lastLoggedDay() {
        const timezone = this.startTimezone;
        const mostRecentlyLoggedDay = this.days[this.days.length - 1];
        if (!mostRecentlyLoggedDay) {
            return moment.tz(this.start, this.startTimezone);
        }

        const mostRecentlyLoggedDateStr = mostRecentlyLoggedDay.date;
        return moment.tz(mostRecentlyLoggedDateStr, timezone);
    }

    isTodayComplete() {
        const timezone = this.startTimezone;
        const mostRecentlyLoggedDate = this.lastLoggedDay();
        if (!mostRecentlyLoggedDate) {
            return false;
        }
        const today = moment.tz(moment(), timezone);
        return today.diff(mostRecentlyLoggedDate, 'days') === 0;
    }

    providedPictureWhenNecessary() {
        // every 7 days
        return true;
    }

    getPreviousDay(offset) {
        if (this.isTodayComplete()) {
            offset++;
        }
        return this.days[this.days.length - offset];
    }

    isRestDay() {
        const today = this.getToday();
        const prevDay1 = this.getPreviousDay(1);
        const prevDay2 = this.getPreviousDay(2);
        return !today.didWorkout && (prevDay1 && prevDay1.didWorkout) && (prevDay2 && prevDay2.didWorkout);
    }

    isCheatDay() {
        const today = this.getToday();
        const prevDay1 = this.getPreviousDay(1);
        const prevDay2 = this.getPreviousDay(2);
        const prevDay3 = this.getPreviousDay(3);
        return !today.noCheatMeals && (prevDay1 && prevDay1.noCheatMeals) && (prevDay2 && prevDay2.noCheatMeals) && (prevDay3 && prevDay3.noCheatMeals);
    }

    isTodaySuccess() {
        const today = this.getToday();

        return (today.didWorkout || this.isRestDay())
            && (today.noCheatMeals || this.isCheatDay())
            && today.didRead && today.didDrinkWater
            && this.providedPictureWhenNecessary();
    }

    getTodayFromCache() {
        let today;
        const startTimezone = this.startTimezone;
        try {
            let str = localStorage.getItem(`today:${this.phoneNumber}`);
            today = JSON.parse(str);
        } catch (err) {
        }
        const lastLoggedDay = this.lastLoggedDay();
        const todaysDate = moment.tz(moment(), startTimezone).startOf('day');
        let currentDay;
        if (lastLoggedDay) {
            currentDay = (lastLoggedDay && todaysDate.diff(lastLoggedDay, 'days')) < 0
                ? moment.tz(moment(), startTimezone).startOf('day')
                : lastLoggedDay.add(1, 'days');
        } else {
            currentDay = moment.tz(moment(), startTimezone).startOf('day');
        }
        if (!today) {
            today = {
                date: currentDay.toISOString(),
                didWorkout: false,
                didRead: false,
                didDrinkWater: false,
                noCheatMeals: false
            };
        }
        this.today = today;

        return today;
    }

    clearTodayFromCache() {
        try {
            localStorage.removeItem(`today:${this.phoneNumber}`);
            this.today = undefined;
        } catch (err) {
        }
    }

    getToday() {
        if (!this.today) {
            this.today = this.getTodayFromCache();
        }
        return this.today;
    }

    backupUser(phoneNumber) {
        try {
            localStorage.setItem('userPhoneNumber', phoneNumber);
        } catch (err) {
            console.log('Could not back-up current data to localStorage ' + err);
        }
    }

    backupToday(day) {
        this.today = day;
        try {
            localStorage.setItem(`today:${this.phoneNumber}`, JSON.stringify(day));
        } catch (err) {
            console.log('Could not back-up current data to localStorage ' + err);
        }
    }

    checkDidWorkout() {
        const today = this.getToday();
        today.didWorkout = true;
        this.backupToday(today);
        this._didUpdate();
    }

    uncheckDidWorkout() {
        const today = this.getToday();
        today.didWorkout = false;
        this.backupToday(today);
        this._didUpdate();
    }

    checkDidDrinkWater() {
        const today = this.getToday();
        today.didDrinkWater = true;
        this.backupToday(today);
        this._didUpdate();
    }

    uncheckDidDrinkWater() {
        const today = this.getToday();
        today.didDrinkWater = false;
        this.backupToday(today);
        this._didUpdate();
    }

    checkDidRead() {
        const today = this.getToday();
        today.didRead = true;
        this.backupToday(today);
        this._didUpdate();
    }

    uncheckDidRead() {
        const today = this.getToday();
        today.didRead = false;
        this.backupToday(today);
        this._didUpdate();
    }

    checkNoCheatMeals() {
        const today = this.getToday();
        today.noCheatMeals = true;
        this.backupToday(today);
        this._didUpdate();
    }

    uncheckNoCheatMeals() {
        const today = this.getToday();
        today.noCheatMeals = false;
        this.backupToday(today);
        this._didUpdate();
    }

    async completedToday() {
        this.days.push(this.getToday());
        this.currentStreak++;
        if (this.currentStreak > this.maxStreak) {
            this.maxStreak = this.currentStreak;
        }

        await this.updateUserRecord();

        this.clearTodayFromCache();
        this._didUpdate();
    }

    async failedToday(day) {
        console.log(day);
        if (this.currentStreak > this.maxStreak) {
            this.maxStreak = this.currentStreak;
        }

        this.currentStreak = 0;
        this.days = [];
        this.start = false;
        this.startTimezone = false;

        await this.updateUserRecord();

        this.clearTodayFromCache();
        this._didUpdate();
    }

    getCurrentDay() {
        const mostRecentlyLoggedDate = this.lastLoggedDay();
        return mostRecentlyLoggedDate.add(1, 'days');
    }

    dayHeaderLabel() {
        const numDays = this.days.length;
        let dayLabel = numDays + (this.isTodayComplete() ? 0 : 1);

        if (this.isTodayComplete()) {
            dayLabel = numDays;
        } else {
            const mostRecentlyLoggedDate = this.lastLoggedDay();
            const timezone = this.startTimezone;
            const today = moment.tz(moment(), timezone);
            const dayDiff = today.diff(mostRecentlyLoggedDate, 'days');

            if (dayDiff > 1) {
                // gap
                dayLabel = `${numDays + 1} → ${numDays + dayDiff}`;
            } else {
                dayLabel = numDays + 1;
            }
        }

        return `Day ${dayLabel}`;
    }
}
