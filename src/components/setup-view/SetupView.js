import { Component } from 'react';

class SetupView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settingUpUser: false
        };
    }

    handlePhoneNumberChange(evt) {
        this._phoneNumberInput = evt.target.value;
    }

    async handlePhoneNumberEntered(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        const { appStore } = this.props;

        this.setState({ settingUpUser: true });
        await appStore.setupUser(this._phoneNumberInput);
        this.setState({ settingUpUser: false });
    }

    render() {
        return (
            <div className="setup-view">
                <img className="big-logo" src="/logo.png" />
                <form className="setup-view-inner">
                    <label htmlFor="phoneNumber">Enter your phone number:</label>
                    <br/>
                    <input onChange={this.handlePhoneNumberChange.bind(this)} id="phoneNumber" name="phoneNumber" placeholder="Ex: 2098675309" />
                    <br/>
                    <button onClick={this.handlePhoneNumberEntered.bind(this)}>Set</button>
                </form>
            </div>
        );
    }
}

export default SetupView;
