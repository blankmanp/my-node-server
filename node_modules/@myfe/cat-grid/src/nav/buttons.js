import React, { Component } from 'react';
import _ from 'lodash';

export default class Buttons extends Component {
    static propTypes = {
        prefixName: React.PropTypes.string,
        batch: React.PropTypes.array,
        selected: React.PropTypes.array
    }
    static defaultProps = {
        prefixName: 'cat',
        batch: [],
        selected: []
    }

    constructor(props) {
        super(props); 
    }

    render() {
        let { prefixName, batch, selected } = this.props;

        return (
            <ul className={`${prefixName}-table-headernote nav navbar-nav pull-right`}>
                {
                    _.map(batch, function(item, index) {
                        let myStyle = item.myStyle ? item.myStyle : 'default';
                        return (
                            <li key={index}>
                                <button className={`btn btn-${myStyle} btn-xs`} onClick={item.onClick.bind(null, selected)}>
                                    {
                                        (() => {if (item.name) {
                                            return item.name;
                                        } else {
                                            return (
                                                <i className={item.icon}/>
                                            );
                                        }})()
                                    }
                                </button>
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}
