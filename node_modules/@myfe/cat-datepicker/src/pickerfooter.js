import React, { Component } from 'react';

class PickerFooter extends Component {
    constructor(props) {
        super(props);
    }

    handleChooseNow = () => {
        var date = new Date();
        this.props.dateSwitch(date, 'date');
    }

    handleClick = () => {
        this.props.dateSwitch(this.props.selectedDate, 'date');
    }
    
    renderNow() {
        if (!this.props.showNow) {
            return null;
        } else {
            let word = this.props.timeOnly === true ? '现在' : '今天';
            return (
                <button
                    className="btn btn-link btn-block"
                    onClick={this.handleChooseNow}
                     type="button"
                >
                    {word}
                </button>
            );
        }
    }

    renderConfirm() {
        if (this.props.dateOnly === true && this.props.timeOnly !== true) {
            return null;
        } else {
            return (
                <button
                    className="btn btn-default btn-block"
                    onClick={this.handleClick}
                    type="button"
                >
                    确定
                </button>
            );
        }
    }

    render() {
        return (
            <div className="cat-calendar-cell-footer clearfix">
                {this.renderNow()}
                {this.renderConfirm()}
            </div>
        )
    }
}

export default PickerFooter;
