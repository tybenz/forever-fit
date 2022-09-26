import Settings from '../settings';

const host = Settings.get('apiHost');
let id = 1;

export default class AppStore {
    constructor() {
        let phoneNumber;
        this.id = id;
        id++;

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

        return fetch(`${host}/users/${this.phoneNumber}`).then(async (res) => {
            const user = await res.json();

            if (!user) {
                this._didUpdate();
                return false;
            }

            this.phoneNumber = user.id;
            this.days = user.days;
            this.starts = user.starts;
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
            body: JSON.stringify({
                phoneNumber,
                days: [],
                starts: [],
                currentStreak: 0,
                maxStreak: 0
            })
        }).then(() => {
            this.phoneNumber = phoneNumber;
            this.days = []
            this.starts = []
            this.currentStreak = 0
            this.maxStreak = 0;
            this._didUpdate();
        });
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
