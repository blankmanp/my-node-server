import React, {Component} from 'react';
import _ from 'lodash';

export default class Footer extends Component {
    static propTypes = {
        buttons: React.PropTypes.array,
        noButtons: React.PropTypes.bool
    }
    static defaultProps = {
        buttons: [{
            name: '关闭'
        }],
        noButtons: false
    }

    constructor(props) {
        super(props);
    }

    render() {
        let { buttons, onClose, noButtons} = this.props;

        if (!noButtons) {
            return (
                <div className="modal-footer">
                    {
                        _.map(buttons, function(item, index) {
                            let handleClick = item.onClick ? item.onClick : onClose,
                                myStyle = item.myStyle ? item.myStyle : 'default';
                            return (
                                <button
                                    className={`btn btn-${myStyle}`}
                                    onClick={handleClick}
                                    key={index}
                                >
                                    {item.name}
                                </button>        
                            );
                        })
                    }
                </div>
            );
        } else {
            return null;
        }
    }
}
