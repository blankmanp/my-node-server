import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Footer from './footer';
import { keyCode } from 'cat-util';

export default class Dialog extends Component {
    static propTypes = {
        show: React.PropTypes.bool,
        toBody: React.PropTypes.bool,
        mySize: React.PropTypes.string,
        title: React.PropTypes.string,
        noCloseButton: React.PropTypes.bool,
        buttons: React.PropTypes.array,
        noButtons: React.PropTypes.bool,
        autoClose: React.PropTypes.bool
    }
    static defaultProps = {
        show: false,
        toBody: true,
        mySize: 'medium',
        title: '标题',
        noCloseButton: false,
        buttons: [{
            name: '关闭'
        }],
        noButtons: false,
        autoClose: true
    }

    constructor(props) {
        super(props);
        this.size = {
            'auto': 'auto',
            'large': 'lg',
            'medium': '',
            'small': 'sm'
        }
    }

    _handleClose(event) {
        if (event.target.className == 'modal fade in' && this.props.autoClose) {
            this.props.onClose();
        }
    }

    state = {
        show: this.props.show
    }

    render() {
        if (this.props.show) {
            this.rendered = true;
        }
        return this.props.toBody ? null : (this.rendered ? this._renderDialog() : null);
    }

    componentDidUpdate() {
        if (this.props.toBody && this.rendered) {
            ReactDOM.render(this._renderDialog(), this._getDialogContainer());
        }
    }

    componentWillUnmount() {
        if (this.dialogContainer) {
            this._cleanDialogContainer();
        }
    }

    // 生成外部结构
    _getDialogContainer() {
        if (!this.dialogContainer) {
            this.dialogContainer = document.createElement('div');
            this.dialogContainer.className = 'my-dialog-container';
            document.body.appendChild(this.dialogContainer);
        }
        return this.dialogContainer;
    }

    // 清除节点
    _cleanDialogContainer() {
        React.unmountComponentAtNode(this._getDialogContainer());
        document.body.removeChild(this.dialogContainer);
        this.dialogContainer = null;
    }

    // 生成主要内容
    _renderDialog() {
        let { mySize, show, title, noCloseButton, onClose, buttons, noButtons } = this.props,
            divStyle={
                display: show ? 'block' : 'none'
            },
            className = `modal-dialog modal-${this.size[mySize]}`;

        return (
            <div className="modal-open">
                <div
                    className="modal fade in"
                    style={divStyle}
                    onClick={this::this._handleClose}
                >
                    <div className={className}>
                        <div className="modal-content">
                            <Header
                                title={title}
                                noCloseButton={noCloseButton}
                                onClose={onClose}
                            />
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            <Footer
                                buttons={buttons}
                                onClose={onClose}
                                noButtons={noButtons}
                            />
                        </div>
                    </div>
                </div>
                {this._renderBackdrop()}
            </div>
        );
    }


    // 生成背景
    _renderBackdrop() {
        let { show, onClose } = this.props,
            divStyle={
                display: show ? 'block' : 'none'
            };
        return (
            <div className="modal-backdrop fade in" style={divStyle}></div>
        );
    }
}
