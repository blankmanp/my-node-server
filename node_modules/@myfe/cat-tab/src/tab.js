import React, { Component } from 'react';
import { setClass } from 'cat-util';
import Panel from './nav';
import Content from './content';

class Tab extends Component {
    static propTypes = {
        liveKey: React.PropTypes.string,
        prefixName: React.PropTypes.string,
        myStyle: React.PropTypes.string,

        stacked: React.PropTypes.bool,
        justified: React.PropTypes.bool
    }

    static defaultProps = {
        prefixName: 'cat',
        myStyle: 'tabs',    //tabs/pills
        stacked: false,
        justified: false
    }

    state = {
        liveKey: this.props.liveKey
    }
    
    componentWillReceiveProps(nextProps) {
        let { liveKey } = nextProps;
        if (this.state.liveKey !== liveKey) {
            this.setState({
                liveKey: liveKey
            });
        }
    }

    handleSelect(key) {
        this.setState({
            liveKey: key
        });
    }

    _renderNavs() {
        let self = this;

        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                liveKey: self.state.liveKey,
                onClick: self.handleSelect.bind(self),
                extraCallBack: self.props.onSelect
            });
        });
    }

    _renderContent() {
        let self = this;

        if (!this.props.children[0].props.children) {
            return null;
        }

        return (
            <div className={`${this.props.prefixName}-tab-content`}>
                {
                    React.Children.map(this.props.children, child => {
                        return (
                            <Content
                                liveKey={self.state.liveKey}
                                prefixName={self.props.prefixName}
                                eventKey={child.props.eventKey}
                            >
                                {child.props.children}
                            </Content>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        let { prefixName, myStyle, stacked, justified } = this.props,
            classNames = setClass(`${prefixName}-nav`, `${prefixName}-nav-${myStyle}`, {
                [`${prefixName}-nav-stacked`]: stacked,
                [`${prefixName}-nav-justified`]: justified
            });

        return (
            <div className={`${prefixName}-tab-container`}>
                <ul className={classNames}>
                    {this._renderNavs()}
                </ul>
                {this._renderContent()}
            </div>
        );
    }
}

Tab.Panel = Panel;

export default Tab;
