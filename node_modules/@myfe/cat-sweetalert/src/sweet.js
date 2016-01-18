import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dialog, { Footer } from '@myfe/cat-dialog';
import Alert from './alert';
import Confirm from './confirm';

class SweetAlert extends Component {
    state={
        show: false
    }

    show(type, config, callback) {
        this.setState({
            show: true,
            type: type,
            config: config,
            callback: callback
        });
    }

    _close() {
        this.setState({
            show: false
        });
    }

    render() {
        return (
            <Dialog
                show={this.state.show}
                toBody={false}
                onClose={this::this._close}
                noButtons
                title=''
                autoClose={false}
            >
                {this._renderContent()}
            </Dialog>
        );
    }

    _renderContent() {
        switch (this.state.type) {
            case 'alert':
                return (
                    <Alert
                        config={this.state.config}
                        close={this::this._close}
                    />
                );
                break;
            case 'confirm':
                return (
                    <Confirm
                        config={this.state.config}
                        callback={this.state.callback}
                        close={this::this._close}
                    />
                );
                break;
            case 'prompt':
                return (
                    <Confirm
                        config={this.state.config}
                        callback={this.state.callback}
                        close={this::this._close}
                        isPrompt
                    />        
                );
                break;
        }
        return null;
    }
}

SweetAlert.newInstance = function (type){
    let div = document.createElement('div');
    div.className = 'my-sweetalert-container';
    document.body.appendChild(div);
    let sweet = ReactDOM.render(<SweetAlert />, div);
    return {
        show: function(type, config, callback) {
            sweet.show(type, config, callback);
        },
        component: sweet
    }
}

export default SweetAlert
