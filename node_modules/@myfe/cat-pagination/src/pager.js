import React, { Component } from 'react';

class Pager extends Component {
    static propTypes = {
        page: React.PropTypes.string,
        target: React.PropTypes.number,
        totalPage: React.PropTypes.number
    }

    static defaultProps = {
        page: '',
        target: -1,
        totalPage: 0
    }

    state = {
        disabled: this.props.target < 0 || (this.props.totalPage !== -1 && this.props.target >= this.props.totalPage)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            disabled: nextProps.target < 0 || (nextProps.totalPage !== -1 && nextProps.target >= nextProps.totalPage)
        });
    }
    
    constructor(props) {
        super(props);
    }

    _handleClick(event) {
        event.preventDefault();
        if (!this.state.disabled) {
            this.props.handleClick(this.props.target);
        }
    }

    render() {
        let disabled = this.state.disabled ? 'disabled' : '',
            active = this.props.target === this.props.offset ? ' active' : '',
            classes = `${disabled} ${active}`;

        return (
            <li className={classes}>
                <a href="#" onClick={this._handleClick.bind(this)}>
                    {this.props.page}
                </a>
            </li>
        );
    }
}

export default Pager;
