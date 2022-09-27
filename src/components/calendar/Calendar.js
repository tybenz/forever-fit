import { Component } from 'react';
import moment from 'moment';
import 'moment-timezone';

class Calendar extends Component {
    handleCloseClick(evt) {
        this.props.onHide(evt);
    }

    getAllMonths() {
        const { appStore } = this.props;
        const loggedDays = appStore.days;
        const firstLoggedDate = moment.tz(loggedDays[0].date, appStore.startTimezone);
        const lastLoggedDate = moment.tz(loggedDays[loggedDays.length - 1].date, appStore.startTimezone);
        const firstLoggedMonth = firstLoggedDate.month();
        const firstLoggedDateStartOfMonth = firstLoggedDate.startOf('month');
        const lastLoggedMonth = lastLoggedDate.month();

        const months = [];
        let offset = 0;
        for (let i = firstLoggedMonth; i <= lastLoggedMonth; i++) {
            months.push(this.getDatesForMonth(firstLoggedDateStartOfMonth.add(offset, 'months')));
            offset++;
        }
        return months;
    }

    getDatesForMonth(dateProvided) {
        const { appStore } = this.props;
        const loggedDays = appStore.days;
        const firstLoggedDate = moment.tz(loggedDays[0].date, appStore.startTimezone);

        const date = dateProvided || moment();
        var daysInMonth = date.daysInMonth();
        var arrDays = [];

        while(daysInMonth) {
            var current = date.clone().date(daysInMonth);
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
        var dayOfMonthIndex = 0;
        let currentLoggedDateIndex = -1;
        for (var currentWeek = 0; currentWeek < numWeeksToDisplay; currentWeek++) {
            let start;
            let end;
            if (currentWeek === 0) {
                start = first.day();
                end = 7;
            } else if (currentWeek === numWeeksToDisplay - 1) {
                start = 0;
                end = last.day() + 1;
            } else {
                start = 0;
                end = 7;
            }

            week = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
            weeks[currentWeek] = week;
            for (var i = start; i < end; i++) {
                const date = arrDays[dayOfMonthIndex];
                const diff = date.diff(firstLoggedDate, 'days');
                if (currentLoggedDateIndex === -1 && diff >= 0) {
                    currentLoggedDateIndex = diff;
                }

                if (currentLoggedDateIndex > -1) {
                    week[i] = { data: loggedDays[currentLoggedDateIndex], num: currentLoggedDateIndex + 1, date }
                } else {
                    week[i] = { date }
                }
                dayOfMonthIndex++;
                if (currentLoggedDateIndex > -1) {
                    currentLoggedDateIndex++;
                }
            }
        }
        return weeks;
    }

    render() {
        const dates = this.getAllMonths();
        return (
            <div className="calendar-view">
                <button className="calendar-close" onClick={this.handleCloseClick.bind(this)}></button>
                <div className="calendar">
                    {dates.map((month, i) => {
                        return (
                            <div key={`month-${i}`} className="month">
                                <div className="month-title">{month[2][0].date.format('MMMM')}</div>
                                <div className="month-grid">
                                    {month.map((week, j) => {
                                        return (
                                            <div key={`week-${j}`} className="calendar-row">
                                                {week.map((day, k) => {
                                                    if (!day) {
                                                        return <div key={`day-${k}`} className="calendar-day blank"></div>;
                                                    }
                                                    if (!day || !day.data) {
                                                        return <div key={`day-${k}`} className="calendar-day inactive"></div>;
                                                    }
                                                    if (day.data && !day.data.noCheatMeals) {
                                                        return <div key={`day-${k}`} className="calendar-day completed cheat-meal">{day.num}</div>;
                                                    }
                                                    if (day.data && !day.data.didWorkout) {
                                                        return <div key={`day-${k}`} className="calendar-day completed rest-day">{day.num}</div>;
                                                    }
                                                    return <div key={`day-${k}`} className="calendar-day completed">{day.num}</div>;
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Calendar;
