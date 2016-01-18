import React, { Component } from 'react';
import { setClass } from 'cat-util';

class Nav extends Component {

    handleSelect(event) {
        let { disabled, eventKey, href } = this.props;
        if (!href) {
            event.preventDefault();
        }

        if (!disabled) {
            this.props.onClick(eventKey, event);
            if (this.props.extraCallBack) {
                this.props.extraCallBack(eventKey, event);
            }
        }
    }

    render() {
        let { liveKey, eventKey, disabled, href="#" } = this.props,
            classNames = setClass({
                active: liveKey === eventKey,
                disabled: disabled
            });
            
        return (
            <li className={classNames}>
                <a onClick={this::this.handleSelect} href={href}>
                    {this.props.tab}
                </a>
            </li>
        );
    }
}

export default Nav;
