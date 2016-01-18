import React, { Component } from 'react';
import PickerHeader from './pickerheader.js';
import PickerBody from './pickerbody.js';
import PickerFooter from './pickerfooter.js';
import PickerTime from './pickertime.js';

class Picker extends Component {
    state = {
        type: this.props.yearOnly ?
                'year' :
                this.props.monthOnly ?
                    'month' :
                    'day',
        activeDate: this.props.activeDate
    }

    constructor(props) {
        super(props);
    }

    _handleValue = (d, visible) => {
        this.props.onSelect(d, visible);
    }

    dateSwitch = (target, type) => {
        let d = this.state.activeDate;
        switch (type) {
            case 'day':
                d.setDate(target);
                let visible = this.props.dateOnly !== true;
                this._handleValue(d, visible);
                break;
            case 'month':
                if (Number.isFinite(target)) {
                    d.setMonth(target);
                    if (!this.props.monthOnly) {
                        type="day";
                    } else {
                        this._handleValue(d, false);
                    }
                } else if (this.props.yearOnly) {
                    type="year"
                }
                break;
            case 'year':
                if (Number.isFinite(target)) {
                    if (Math.abs(d.getFullYear() - target) < 20) {
                        if (!this.props.yearOnly) {
                            type="month";
                        } else {
                            this._handleValue(d, false);
                        }
                    }
                    d.setYear(target);
                }
                break;
            // 点击底部按钮进入此条件,点击完成以后回到day状态
            case 'date':
                d = target ? target : d;
                type="day";
                this._handleValue(d, false);
                break;
            case 'hour':
                type="day";
                d.setHours(target);
                this._handleValue(d, true);
                break;
            case 'minute':
                type="day";
                d.setMinutes(target);
                this._handleValue(d, true);
                break;
            case 'seconds':
                type="day";
                d.setSeconds(target);
                this._handleValue(d, true);
                break;
        }
        this.setState({
            type: type,
            activeDate: d
        });
    }

    timeSwitch = (target, type) => {
        this.setState({
            type: type
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeDate: nextProps.activeDate,
            selectedDate: nextProps.selectedDate
        });
    }

    render() {
        let { type, activeDate } = this.state,
            { selectedDate, showNow, dateOnly, timeOnly } = this.props,
            month = activeDate.getMonth(),
            year = activeDate.getFullYear();

        let divStyle = {
            display: this.props.visible ? 'block' : 'none'
        }

        return (
            <div
                className="cat-calendar-content"
                style={divStyle}
            >
                <PickerHeader
                    year={year}
                    month={month}
                    type={type}
                    dateSwitch={this.dateSwitch}
                    timeOnly={timeOnly}
                />
                <PickerBody
                    year={year}
                    month={month}
                    type={type}
                    selectedDate={selectedDate}
                    dateSwitch={this.dateSwitch}
                    timeOnly={timeOnly}
                />
                <PickerTime
                    type={type}
                    dateOnly={dateOnly}
                    timeOnly={timeOnly}
                    timeSwitch={this.timeSwitch}
                    time={selectedDate}
                />
                <PickerFooter
                    showNow={showNow}
                    dateOnly={dateOnly}
                    timeOnly={timeOnly}
                    selectedDate={selectedDate}
                    dateSwitch={this.dateSwitch}
                />
            </div>        
        );
    }
}

export default Picker;
