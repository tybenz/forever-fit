import { Component } from 'react';
import moment from 'moment';
import 'moment-timezone';

class Calendar extends Component {
    handleCloseClick(evt) {
        this.props.onHide(evt);
    }

    getDatesForMonth() {
        // const { appStore } = this.props;
        // const loggedDays = appStore.days;
        var daysInMonth = moment().daysInMonth();
        var arrDays = [];

        while(daysInMonth) {
            var current = moment().date(daysInMonth);
            arrDays.push(current);
            daysInMonth--;
        }

        arrDays = arrDays.reverse();

        const first = arrDays[0];
        const last = arrDays[arrDays.length - 1];
        let numWeeksToDisplay = 5;
        if (first.day() === 5 && arrDays.length === 31)  {
            numWeeksToDisplay = 6;
        }
        if (first.day() === 6 && arrDays.length === 30)  {
            numWeeksToDisplay = 6;
        }

        const weeks = [];
        let week;
        for (var currentWeek = 0; currentWeek < numWeeksToDisplay; currentWeek++) {
            if (currentWeek === 0) {
                week = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
                weeks[currentWeek] = week;
                var j = 0;
                for (var i = first.day(); i < 7; i++) {
                    week[i] = { date: arrDays[j] }
                    j++;
                }
            } else if (currentWeek === numWeeksToDisplay - 1) {
                week = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
                weeks[numWeeksToDisplay - 1] = week;
                var j = 0;
                for (var i = 0; i < last.day(); i++) {
                    week[i] = { date: arrDays[j] };
                    j++;
                }
            } else {
                week = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
                weeks[currentWeek] = week;
                var j = 0;
                for (var i = 0; i < 7; i++) {
                    week[i] = { date: arrDays[j] };
                    j++;
                }
            }
        }
        return weeks;
    }

    render() {
        const dates = this.getDatesForMonth();
        console.log(dates);
        return (
            <div className="calendar-view">
                <button className="calendar-close" onClick={this.handleCloseClick.bind(this)}></button>
                <div className="calendar">
                    <div className="month">
                        <div className="month-title">{dates[2][0].format('MMMM')}</div>
                        <div className="month-grid">
                            {dates.map((week) => {
                                return (
                                    <div className="calendar-row">
                                        {week.map((day) => {
                                            if (!day) {
                                                return <div className="calendar-day blank"></div>;
                                            }
                                            return <div className="calendar-day inactive"></div>;
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calendar;
