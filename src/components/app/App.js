import { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this._update = this._update.bind(this);
        this.state = {
            settingUpUser: false
        };
    }

    handlePhoneNumberChange(evt) {
        this._phoneNumberInput = evt.target.value;
    }

    async handlePhoneNumberEntered() {
        const { appStore } = this.props;

        this.setState({ settingUpUser: true });
        await appStore.setupUser(this._phoneNumberInput);
        this.setState({ settingUpUser: false });
    }

    _update() {
        this.forceUpdate();
    }

    componentDidMount() {
        window.addEventListener('app-store-did-update', this._update);
    }

    componentWillUnmount() {
        window.removeEventListener('app-store-did-update', this._update);
    }

    _renderMain() {
        // const { appStore } = this.props;
        // const { phoneNumber } = appStore;

        // if (!phoneNumber) {
        //     return (
        //         <>
        //             <input onChange={this.handlePhoneNumberChange.bind(this)} placeholder="Enter your phone number..." />
        //             <button onClick={this.handlePhoneNumberEntered.bind(this)}>Ok</button>
        //         </>
        //     );
        // }

        const view = "day";

        if (view === "setup") {
            return (
                <div class="setup-view">
                    <form class="setup-view-inner">
                        <label htmlFor="phoneNumber">Enter your phone number</label>
                        <br/>
                        <input onChange={this.handlePhoneNumberChange.bind(this)} id="phoneNumber" name="phoneNumber" placeholder="Ex: 2098675309" />
                        <br/>
                        <input type="button" onClick={this.handlePhoneNumberEntered.bind(this)} value="Submit" />
                    </form>
                </div>
            );
        }

        if (view === "pending") {
            return (
                <div class="pending-view">
                </div>
            );
        }

        if (view === "calendar") {
            return (
                <div class="calender-view">
                </div>
            );
        }

        // view === "day"
        return (
            <div className="day-view">
                <div className="header">
                    <div className="header-title">Day 1</div>
                    <button alt="Calendar" title="Calendar"></button>
                </div>
                <div className="day">
                    <div className="line-item">
                        <input type="checkbox" id="didWorkout" name="didWorkout" />
                        <label htmlFor="didWorkout">Workout</label>
                    </div>
                    <div className="line-item">
                        <input type="checkbox" id="didDrinkWater" name="didDrinkWater" />
                        <label htmlFor="didDrinkWater">Drink 1 gallon of water</label>
                    </div>
                    <div className="line-item">
                        <input type="checkbox" id="didRead" name="didRead" />
                        <label htmlFor="didRead">Read 10 pages</label>
                    </div>
                    <div className="line-item">
                        <input type="checkbox" id="noCheatMeals" name="noCheatMeals" />
                        <label htmlFor="noCheatMeals">No cheat meals</label>
                    </div>
                </div>
                <div className="streaks">
                    <div className="streak current isEqualToMax">
                        <span className="streak-label">Current streak:</span>
                        <span className="streak-value">1</span>
                    </div>
                    <div className="streak max">
                        <span className="streak-label">Max streak:</span>
                        <span className="streak-value">1</span>
                    </div>
                </div>
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
