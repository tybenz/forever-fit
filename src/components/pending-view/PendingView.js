import { Component } from 'react';

class SetupView extends Component {
    async handleStartClick(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        const { appStore } = this.props;

        await appStore.startChallenge();
    }

    render() {
        return (
            <div className="pending-view">
                <img className="big-logo" src="/logo.png" />
                <form className="pending-view-inner">
                    <label>Click "Start" when you are on day one:</label>
                    <br/>
                    <button onClick={this.handleStartClick.bind(this)}>Start</button>
                </form>
            </div>
        );
    }
}

export default SetupView;
