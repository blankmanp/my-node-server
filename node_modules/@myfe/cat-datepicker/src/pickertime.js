import React, { Component } from 'react';

class PickerTime extends Component {

    _handleClick = (timeType, num) => {
        this.props.timeSwitch(num, timeType);
    }

    render() {
        if ((this.props.dateOnly === true && this.props.timeOnly !== true) || this.props.type !== 'day') {
            return null;
        } else {
            let time = this.props.time,
                hour = time.getHours(),
                minute = time.getMinutes(),
                seconds = time.getSeconds();

            return (
                <div className="cat-calendar-cell-footer clearfix">
                    <div className="cat-calendar-cell cat-calendar-cell-time">
                        <button
                            className="btn btn-link btn-block"
                            onClick={this._handleClick.bind(this, 'hour', hour)}
                            type="button"
                        >
                            {hour}时
                        </button>
                    </div>
                    <div className="cat-calendar-cell cat-calendar-cell-time">
                        <button
                            className="btn btn-link btn-block"
                            onClick={this._handleClick.bind(this, 'minute', minute)}
                            type="button"
                        >
                            {minute}分
                        </button>
                    </div>
                    <div className="cat-calendar-cell cat-calendar-cell-time">
                        <button
                            className="btn btn-link btn-block"
                            onClick={this._handleClick.bind(this, 'seconds', seconds)}
                            type="button"
                        >
                            {seconds}秒
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default PickerTime;
