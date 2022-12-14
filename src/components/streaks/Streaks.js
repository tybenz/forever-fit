import { Component } from 'react';

class Streaks extends Component {
    render() {
        const { appStore } = this.props;

        return (
            <div className="streaks">
                <div className="streak current isEqualToMax">
                    <span className="streak-label">Current streak: </span>
                    <span className="streak-value">{appStore.currentStreak ? appStore.currentStreak : 0}</span>
                </div>
                <div className="streak max">
                    <span className="streak-label">Max streak: </span>
                    <span className="streak-value">{appStore.maxStreak ? appStore.maxStreak : 0}</span>
                </div>
            </div>
        );
    }
}

export default Streaks;
