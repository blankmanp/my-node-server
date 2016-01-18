import React, { Component } from 'react';
import { setClass } from 'cat-util';

class Content extends Component {
    static propTypes = {
        prefixName: React.PropTypes.string
    }

    static defaultProps = {
        prefixName: 'cat'
    }

    render() {
        let { prefixName, eventKey, liveKey } = this.props,
            className = setClass(`${prefixName}-tab-pane`, 'fade', {
                'active in': liveKey === eventKey
            });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}

export default Content;
