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
                <div className="setup-view">
                    <form className="setup-view-inner">
                        <label htmlFor="phoneNumber">Enter your phone number:</label>
                        <br/>
                        <input onChange={this.handlePhoneNumberChange.bind(this)} id="phoneNumber" name="phoneNumber" placeholder="Ex: 2098675309" />
                        <br/>
                        <input type="button" onClick={this.handlePhoneNumberEntered.bind(this)} value="Set" />
                    </form>
                </div>
            );
        }

        if (view === "pending") {
            return (
                <div className="pending-view">
                    <form className="pending-view-inner">
                        <label>Click "Start" when you are on day one:</label>
                        <br/>
                        <input type="button" onClick={this.handlePhoneNumberEntered.bind(this)} value="Start" />
                    </form>
                </div>
            );
        }

        if (view === "calendar") {
            return (
                <div className="calendar-view">
                    <button className="calendar-close"></button>
                    <div className="calendar">
                        <div className="month">
                            <div className="month-title">July</div>
                            <div className="month-grid">
                                <div className="calendar-row">
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day inactive"></div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day inactive"></div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day completed">1</div>
                                    <div className="calendar-day completed">2</div>
                                    <div className="calendar-day completed rest-day">3</div>
                                    <div className="calendar-day completed cheat-meal">4</div>
                                    <div className="calendar-day completed">5</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">6</div>
                                    <div className="calendar-day completed">7</div>
                                    <div className="calendar-day completed">8</div>
                                    <div className="calendar-day completed">9</div>
                                    <div className="calendar-day completed">10</div>
                                    <div className="calendar-day completed">11</div>
                                    <div className="calendar-day completed">12</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">13</div>
                                    <div className="calendar-day completed">14</div>
                                    <div className="calendar-day completed">15</div>
                                    <div className="calendar-day completed">16</div>
                                    <div className="calendar-day completed">17</div>
                                    <div className="calendar-day completed">18</div>
                                    <div className="calendar-day completed">19</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">20</div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                </div>
                            </div>
                        </div>
                        <div className="month">
                            <div className="month-title">August</div>
                            <div className="month-grid">
                                <div className="calendar-row">
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day completed">21</div>
                                    <div className="calendar-day completed">22</div>
                                    <div className="calendar-day completed">23</div>
                                    <div className="calendar-day completed">24</div>
                                    <div className="calendar-day completed">25</div>
                                    <div className="calendar-day completed">26</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">27</div>
                                    <div className="calendar-day completed">28</div>
                                    <div className="calendar-day completed">29</div>
                                    <div className="calendar-day completed">30</div>
                                    <div className="calendar-day completed">31</div>
                                    <div className="calendar-day completed">32</div>
                                    <div className="calendar-day completed">33</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">34</div>
                                    <div className="calendar-day completed">35</div>
                                    <div className="calendar-day completed">36</div>
                                    <div className="calendar-day completed">37</div>
                                    <div className="calendar-day completed rest-day">38</div>
                                    <div className="calendar-day completed cheat-meal">39</div>
                                    <div className="calendar-day completed">40</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">41</div>
                                    <div className="calendar-day completed">42</div>
                                    <div className="calendar-day completed">43</div>
                                    <div className="calendar-day completed">44</div>
                                    <div className="calendar-day completed">45</div>
                                    <div className="calendar-day completed">46</div>
                                    <div className="calendar-day completed">47</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">48</div>
                                    <div className="calendar-day completed">49</div>
                                    <div className="calendar-day completed">50</div>
                                    <div className="calendar-day completed">51</div>
                                    <div className="calendar-day completed">52</div>
                                    <div className="calendar-day completed">53</div>
                                    <div className="calendar-day completed">54</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">55</div>
                                    <div className="calendar-day completed">56</div>
                                    <div className="calendar-day completed">57</div>
                                    <div className="calendar-day completed">58</div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                </div>
                            </div>
                        </div>
                        <div className="month">
                            <div className="month-title">September</div>
                            <div className="month-grid">
                                <div className="calendar-row">
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day blank"></div>
                                    <div className="calendar-day completed">59</div>
                                    <div className="calendar-day completed">60</div>
                                    <div className="calendar-day completed">61</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">62</div>
                                    <div className="calendar-day completed">63</div>
                                    <div className="calendar-day completed">64</div>
                                    <div className="calendar-day completed">65</div>
                                    <div className="calendar-day completed">66</div>
                                    <div className="calendar-day completed">67</div>
                                    <div className="calendar-day completed">68</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">69</div>
                                    <div className="calendar-day completed">70</div>
                                    <div className="calendar-day completed">71</div>
                                    <div className="calendar-day completed rest-day">72</div>
                                    <div className="calendar-day completed cheat-meal">73</div>
                                    <div className="calendar-day completed">74</div>
                                    <div className="calendar-day completed">75</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">76</div>
                                    <div className="calendar-day completed">77</div>
                                    <div className="calendar-day completed">78</div>
                                    <div className="calendar-day completed">79</div>
                                    <div className="calendar-day completed">80</div>
                                    <div className="calendar-day completed">81</div>
                                    <div className="calendar-day completed">82</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">83</div>
                                    <div className="calendar-day completed">84</div>
                                    <div className="calendar-day completed">85</div>
                                    <div className="calendar-day completed">86</div>
                                    <div className="calendar-day completed">87</div>
                                    <div className="calendar-day completed">88</div>
                                    <div className="calendar-day completed">89</div>
                                </div>
                                <div className="calendar-row">
                                    <div className="calendar-day completed">90</div>
                                    <div className="calendar-day pending">91</div>
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day inactive"></div>
                                    <div className="calendar-day blank"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // view === "day"
        return (
            <div className="day-view">
                <div className="header">
                    <div className="header-title">Day 1</div>
                    {/*
                    <div className="header-title">Day 13 → 18</div>
                    */}
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
                    {/*
                    <button className="complete-day-button disabled completed" disabled>COMPLETE <span className="thumbs-up" /></button>
                    */}
                    <button className="complete-day-button failure">I Failed</button>
                    {/*
                    <button className="complete-day-button">Done</button>
                    */}
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
