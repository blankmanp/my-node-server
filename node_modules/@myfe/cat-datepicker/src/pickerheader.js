import React, { Component } from 'react';

class PickerHeader extends Component {

    handleClick(number, type) {
        this.props.dateSwitch(number, type);
    }

    render() {
        let type = '',
            count = 0,
            prev = '',
            next = '';
        switch (this.props.type) {
            case 'day':
                type = 'month';
                count = 1;
                break;
            case 'month':
                type = 'year';
                count = 1;
                break;
            case 'year':
                type = 'year';
                count = 20;
                break;
        }
        prev = this.props[type] - count;
        next = this.props[type] + count;
        if (this.props.timeOnly) {
            return null;
        } else {
            return (
                <div className="cat-calendar-header clearfix">
                    <div className="cat-calendar-cell cat-calendar-header-cell-arrow">
                        <button
                            className="btn btn-default"
                            onClick={this.handleClick.bind(this, prev, type)}
                            type="button"
                        >
                            <i className="glyphicon glyphicon-chevron-left"></i>
                        </button>
                    </div>
                    <div className="cat-calendar-cell cat-calendar-header-cell">
                        <button
                            className="btn btn-default"
                            onClick={this.handleClick.bind(this, '', 'year')}
                            type="button"
                        >
                            {this.props.year}年
                        </button>
                    </div>
                    <div className="cat-calendar-cell cat-calendar-header-cell">
                        <button
                            className="btn btn-default"
                            onClick={this.handleClick.bind(this, '', 'month')}
                            type="button"
                        >
                            {this.props.month + 1}月
                        </button>
                    </div>
                    <div className="cat-calendar-cell cat-calendar-header-cell-arrow">
                        <button
                            className="btn btn-default"
                            onClick={this.handleClick.bind(this, next, type)}
                            type="button"
                        >
                            <i className="glyphicon glyphicon-chevron-right"></i>
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default PickerHeader;
