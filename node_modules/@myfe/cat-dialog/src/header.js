import React, {Component} from 'react';

export default class Header extends Component {

    static propTypes = {
        noCloseButton: React.PropTypes.bool,
        title: React.PropTypes.string
    }
    static defaultProps = {
        noCloseButton: false,
        title: ''
    }

    constructor(props) {
        super(props);
    }

    render() {
        let { title } = this.props;
        
        if (title === '') {
            return null;
        } else {
            return (
                <div className="modal-header">
                    {this._renderCloseButton()}
                    <h4 className="modal-title">
                        {title}
                    </h4>
                </div>
            )
        }
    }

    _renderCloseButton() {
        return this.props.noCloseButton ?
            null :
            (
                <button
                    type="button"
                    className="close"
                    onClick={this.props.onClose}
                >
                    <span>&times;</span>
                </button>
            );
    }
}
