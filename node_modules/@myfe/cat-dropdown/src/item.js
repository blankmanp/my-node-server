import React, { Component } from 'react';
import { setClass } from 'cat-util';

class Item extends Component {

    handleSelect(event) {
        let { eventKey, disabled, href } = this.props;

        if (!href) {
            event.preventDefault();
        }

        if(!disabled) {
            this.props.onSelect(eventKey, event);
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
                    {this.props.children}
                </a>
            </li>
        );
    }
}

export default Item;
