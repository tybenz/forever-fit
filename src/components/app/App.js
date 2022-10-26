import { Component } from 'react';
import Calendar from '../calendar/Calendar.js';
import SetupView from '../setup-view/SetupView.js';
import PendingView from '../pending-view/PendingView.js';
import Streaks from '../streaks/Streaks.js';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this._update = this._update.bind(this);
        this.state = {
            showCalendar: false
        };
    }

    _update() {
        setTimeout(() => {
            this.forceUpdate();
        }, 0);
    }

    componentDidMount() {
        window.addEventListener('app-store-did-update', this._update);
    }

    componentWillUnmount() {
        window.removeEventListener('app-store-did-update', this._update);
    }

    handleLogoutButtonClick(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if (window.confirm("Are you sure you want to logout?")) {
            this.props.appStore.logoutUser();
        }
    }

    handleCalendarButtonClick(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        this.setState({ showCalendar: true });
    }

    handleCalendarHide(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        this.setState({ showCalendar: false });
    }

    handleWorkoutCheckbox(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const { appStore } = this.props;
        if (evt.target.checked) {
            appStore.checkDidWorkout();
        } else {
            appStore.uncheckDidWorkout();
        }
    }

    handleWaterCheckbox(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const { appStore } = this.props;
        if (evt.target.checked) {
            appStore.checkDidDrinkWater();
        } else {
            appStore.uncheckDidDrinkWater();
        }
    }

    handleReadingCheckbox(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const { appStore } = this.props;
        if (evt.target.checked) {
            appStore.checkDidRead();
        } else {
            appStore.uncheckDidRead();
        }
    }

    handleMealsCheckbox(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const { appStore } = this.props;
        if (evt.target.checked) {
            appStore.checkNoCheatMeals();
        } else {
            appStore.uncheckNoCheatMeals();
        }
    }

    async handleSuccess(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const { appStore } = this.props;
        await appStore.completedToday();
    }

    async handleFailure(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const { appStore } = this.props;
        await appStore.failedToday();
    }

    _renderDoneButton() {
        const { appStore } = this.props;

        if (appStore.isTodayComplete()) {
            return <button className="complete-day-button disabled completed" disabled>COMPLETE <span className="thumbs-up" /></button>;
        }

        if (appStore.isTodaySuccess()) {
            return <button onClick={this.handleSuccess.bind(this)} className="complete-day-button">Done</button>;
        }

        return <button onClick={this.handleFailure.bind(this)} className="complete-day-button failure">I Failed</button>;
    }

    _renderMain() {
        const { appStore } = this.props;
        const { phoneNumber } = appStore;

        if (!phoneNumber) {
            return <SetupView appStore={appStore} />;
        }

        if (!appStore.challengeIsUnderway()) {
            return <PendingView appStore={appStore} />;
        }

        if (this.state.showCalendar) {
            return <Calendar appStore={appStore} onHide={this.handleCalendarHide.bind(this)} />;
        }

        const isTodayComplete = appStore.isTodayComplete();
        const today = appStore.getToday();
        const { didWorkout, didRead, didDrinkWater, noCheatMeals } = today;
        const isRestDay = appStore.isRestDay();
        const isCheatDay = appStore.isCheatDay();

        // view === "day"
        return (
            <div className="day-view">
                <div className="header">
                    <button alt="Logout" title="Logout" className="logout-button" onClick={this.handleLogoutButtonClick.bind(this)}></button>
                    <div className="header-title">{appStore.dayHeaderLabel()}</div>
                    <button alt="Calendar" title="Calendar" className="calendar-button" onClick={this.handleCalendarButtonClick.bind(this)}></button>
                </div>
                <div className="day">
                    <div className={`line-item${isTodayComplete ? ' disabled' : ''}`}>
                        <input disabled={isTodayComplete} onChange={this.handleWorkoutCheckbox.bind(this)} checked={didWorkout} type="checkbox" id="didWorkout" name="didWorkout" />
                        <label htmlFor="didWorkout">Workout{(isRestDay && !isTodayComplete) ? <span className="rest-day-flag" /> : ''}</label>
                    </div>
                    <div className={`line-item${isTodayComplete ? ' disabled' : ''}`}>
                        <input disabled={isTodayComplete} onChange={this.handleWaterCheckbox.bind(this)} checked={didDrinkWater} type="checkbox" id="didDrinkWater" name="didDrinkWater" />
                        <label htmlFor="didDrinkWater">Drink 1 gallon of water</label>
                    </div>
                    <div className={`line-item${isTodayComplete ? ' disabled' : ''}`}>
                        <input disabled={isTodayComplete} onChange={this.handleReadingCheckbox.bind(this)} checked={didRead} type="checkbox" id="didRead" name="didRead" />
                        <label htmlFor="didRead">Read 10 pages</label>
                    </div>
                    <div className={`line-item${isTodayComplete ? ' disabled' : ''}`}>
                        <input disabled={isTodayComplete} onChange={this.handleMealsCheckbox.bind(this)} checked={noCheatMeals} type="checkbox" id="noCheatMeals" name="noCheatMeals" />
                        <label htmlFor="noCheatMeals">No cheat meals{(isCheatDay && !isTodayComplete) ? <span className="cheat-day-flag" /> : ''}</label>
                    </div>
                    {this._renderDoneButton()}
                </div>
                <Streaks appStore={appStore} />
            </div>
        );
    }

    render() {
        return (
            <div className="app">
                {this._renderMain()}
            </div>
        );
    }
}

export default App;
