import React, { Component } from 'react';
import _ from 'lodash';

export default class Filter extends Component {
    static propTypes = {
        prefixName: React.PropTypes.string,
        filterName: React.PropTypes.object,
        columns: React.PropTypes.array
    }
    static defaultProps = {
        prefixName: 'cat',
        filterName: {
            name: '',
            value: ''
        },
        columns: []
    }

    state = {
        open: false
    }
    constructor(props) {
        super(props);
    }

    _handleFilterChange = (event) => {
        this.props.updateFilter(event.target.value, 'value');
    }

    _handleFilterClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    _handleFilterChoose = (event) => {
        event.preventDefault();
        this.props.updateFilter(event.target.name, 'name');
        this._handleFilterClick();
    }

    render() {
        let { prefixName, filterName, columns } = this.props,
            { open } = this.state,
            self = this,
            dropdownClass = open ? 'dropdown open' : 'dropdown';

        let index = _.findIndex(columns, 'name', filterName.name),
            dropButtonLabel = (index < 0) ? '全部' : columns[index].label;

        return (
            <div className={`${prefixName}-table-headernote pull-left`}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="筛选"
                    value={filterName.value}
                    onChange={self._handleFilterChange}
                />
                <div className={dropdownClass}>
                    <button className="btn btn-default dropdown-toggle" type="button" onClick={self._handleFilterClick}>
                        {dropButtonLabel}
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        <li className={filterName.name === '' ? 'active' : ''}>
                            <a
                                href="#"
                                name=""
                                onClick={this._handleFilterChoose}
                            >
                                全部
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        {
                            _.map(columns, function(item) {
                                if (item.name) {
                                    return (
                                        <li
                                            key={item.name}
                                            className={filterName.name === item.name ? 'active' : ''}
                                        >
                                            <a
                                                href="#"
                                                name={item.name}
                                                onClick={self._handleFilterChoose}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    );
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

