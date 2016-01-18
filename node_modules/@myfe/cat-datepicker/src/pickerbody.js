import React, { Component } from 'react';
import { setClass } from 'cat-util';

function getMaxDay(Year, Month) {
    return new Date(Year, Month, 0).getDate();
};

class PickerBody extends Component {
    constructor(props) {
        super(props);
        this.today = new Date();
    }

    handleClick(number, type) {
        this.props.dateSwitch(number, type);
    }

    renderDay(f_w, m_d, selectedDate, todayDate) {
        let dayPanel = [],
            count = 42,
            weekday = ['日', '一', '二', '三', '四', '五', '六'];

        if (this.props.timeOnly) {
            return null;
        }

        for (let i = 0; i < 7; i ++) {
            dayPanel.push(
                <div className="cat-calendar-cell cat-calendar-cell-day cat-calendar-cell-day-header" key={'weekday' + i}>
                    <button className="btn btn-default btn-block" disabled="disabled" type="button">
                        {weekday[i]}
                    </button>
                </div>
            );
        }
        for (let i = f_w; i >0; i --) {
            dayPanel.push(
                <div className="cat-calendar-cell cat-calendar-cell-day" key={'empty-prev' + i}></div>
            );
        }
        for (let i = 1; i <= m_d; i ++) {
            let classes = setClass({
                'cat-calendar-cell': true,
                'cat-calendar-cell-day': true,
                'cat-calendar-cell-current': todayDate === i,
                'cat-calendar-cell-selected': selectedDate === i
            });
            dayPanel.push(
                <div className={classes} key={'day' + i}>
                    <button className="btn btn-default btn-block" onClick={this.handleClick.bind(this, i, 'day')} type="button">
                        {todayDate === i ? '今' : i}
                    </button>
                </div>
            );
        }
        for (let i = count - f_w - m_d; i > 0; i --) {
            dayPanel.push(
                <div className="cat-calendar-cell cat-calendar-cell-day" key={'empty-next' + i}></div>
            );
        }

        return dayPanel;
    }

    renderMonth(selectedMonth, todayMonth) {
        let monthPanel = [];

        for (let i = 0; i < 12; i ++) {
            let classes = setClass({
                'cat-calendar-cell': true,
                'cat-calendar-cell-month': true,
                'cat-calendar-cell-current': todayMonth === i,
                'cat-calendar-cell-selected': selectedMonth === i
            });
            monthPanel.push(
                <div className={classes} key={'month' + i}>
                    <button className="btn btn-default btn-block" onClick={this.handleClick.bind(this, i, 'month')} type="button">
                        {i+1}月
                    </button>
                </div>
            );
        }
        return monthPanel;
    }

    renderYear(year, selectedYear, todayYear) {
        let YearPanel = [],
            startYear = year - year % 20;

        for (let i = startYear; i < startYear + 20; i ++) {
            let classes = setClass({
                'cat-calendar-cell': true,
                'cat-calendar-cell-year': true,
                'cat-calendar-cell-current': todayYear === i,
                'cat-calendar-cell-selected': selectedYear === i
            });
            YearPanel.push(
                <div className={classes} key={'year' + i}>
                    <button className="btn btn-default btn-block" onClick={this.handleClick.bind(this, i, 'year')} type="button">
                    {i}年
                    </button>
                </div>
            );
        }
        return YearPanel;
    }

    renderHour(selectedHour) {
        let HourPanel = [];

        for (let i = 0; i < 24; i ++) {
            let classes = setClass({
                'cat-calendar-cell': true,
                'cat-calendar-cell-hour': true,
                'cat-calendar-cell-current': false,
                'cat-calendar-cell-selected': selectedHour === i
            });
            HourPanel.push(
                <div className={classes} key={'hour' + i}>
                    <button className="btn btn-default btn-block" onClick={this.handleClick.bind(this, i, 'hour')} type="button">
                    {i}
                    </button>
                </div>
            );
        }

        return HourPanel;
    }

    render60(type, selected) {
        let TimePanel = [];

        for (let i = 0; i < 60; i ++) {
            let classes = setClass({
                'cat-calendar-cell': true,
                'cat-calendar-cell-60': true,
                'cat-calendar-cell-current': false,
                'cat-calendar-cell-selected': selected === i
            });
            TimePanel.push(
                <div className={classes} key={type + i}>
                    <button className="btn btn-default btn-block" onClick={this.handleClick.bind(this, i, type)} type="button">
                    {i}
                    </button>
                </div>
            ); 
        }

        return TimePanel;
    }

    renderContent() {
        let year = this.props.year,
            month = this.props.month,
            todayDate = this.today.getDate(),
            todayMonth = this.today.getMonth(),
            todayYear = this.today.getFullYear(),
            selectedDate = this.props.selectedDate;
            
        switch (this.props.type) {
            case 'day':
                let MaxDay = getMaxDay(year, month + 1),
                    FirstDayOfMonth = new Date(year, month, 1).getDay();
                selectedDate = (selectedDate.getFullYear() === year && selectedDate.getMonth() === month) ? selectedDate.getDate() : -1;
                if (year != todayYear || month != todayMonth) {
                    todayDate = -1; 
                }

                return this.renderDay(FirstDayOfMonth, MaxDay, selectedDate, todayDate);
                break;
            case 'month':
                let selectedMonth = selectedDate.getFullYear() === year ? selectedDate.getMonth() : -1;
                if (year != todayYear) {
                    todayMonth = -1;
                }
                return this.renderMonth(selectedMonth, todayMonth);
                break;
            case 'year':
                let selectedYear = selectedDate.getFullYear();
                return this.renderYear(year, selectedYear, todayYear);
                break;
            case 'hour':
                let selectedHour = selectedDate.getHours();
                return this.renderHour(selectedHour);
                break;
            case 'minute':
                let selectedMinute = selectedDate.getMinutes();
                return this.render60('minute', selectedMinute);
                break;
            case 'seconds':
                let selectedSeconds = selectedDate.getSeconds();
                return this.render60('seconds', selectedSeconds);
                break;
        }
    }

    render() {
        return (
            <div className="cat-calendar-body clearfix">
                {this.renderContent()}
            </div>
        )
    }
}

export default PickerBody;
