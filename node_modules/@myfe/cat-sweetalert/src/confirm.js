import React, { Component } from 'react';
import Button from '@myfe/cat-button';

class Confirm extends Component {
    state = {
        text: this.props.config.value
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            text: nextProps.config.value
        });
    }

    updateInput(event) {
        this.setState({
            text: event.target.value
        });
    }

    handleClick(confirm) {
        if (this.props.isPrompt) {
            this.setState({
                text: undefined
            })
        }
        if ( confirm || (!confirm && this.props.config.cancelFunction) ) {
            if (this.props.isPrompt) {
                confirm = this.state.text;
            }
            this.props.callback(confirm);
        }
        this.props.close();
    }

    renderInput() {
        return this.props.isPrompt ?
            (
                <form>
                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder={this.props.config.inputPlaceholder}
                            value={this.state.text}
                            onChange={this.updateInput.bind(this)}
                        />
                    </div>
                </form>
            ) :
            null;
    }

    render() {
        let config = this.props.config,
            { cancelText = '取消', confirmText = '确定', style = 'info' } = config,
            icons = {
                success: 'ok-sign',
                info: 'info-sign',
                warning: 'bell',
                danger: 'alert'
            },
            iconClassName = `glyphicon glyphicon-${icons[style] ? icons[style] : 'info-sign'}`;

        return (
            <div className="clearfix cat-confirm">
                <div className="row cat-alert-container">
                    <i className={iconClassName} />
                    <div>
                        <h2>{this.props.config.title}</h2>
                        <p>{this.props.config.text}</p>
                        {this.renderInput()}
                    </div>
                </div>
                <Button
                    onClick={this.handleClick.bind(this, false)}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={this.handleClick.bind(this, true)}
                    myStyle={style}
                >
                    {confirmText}
                </Button>
            </div>
        );
    }
}

export default Confirm;
