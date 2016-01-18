import React, { Component } from 'react';
import _ from 'lodash';
import GridHead from './grid/gridhead.js';
import GridBody from './grid/gridbody.js';
import NavHeader from './nav/navheader.js';
import NavFooter from './nav/navfooter.js';

export default class Grid extends Component {
    static propTypes = {
        columns: React.PropTypes.array,
        rows: React.PropTypes.array,
        offset: React.PropTypes.number,
        total: React.PropTypes.number,
        limit: React.PropTypes.number,
        renderKey: React.PropTypes.string,
        query: React.PropTypes.object,

        enableSelection: React.PropTypes.bool,
        filter: React.PropTypes.bool,
        className: React.PropTypes.string,
        heightControl: React.PropTypes.string,
        prefixName: React.PropTypes.string,
        TableStyle: React.PropTypes.array,
        myHeadStyle: React.PropTypes.string,
        batch: React.PropTypes.array
    }

    static defaultProps = {
        columns: [],
        rows: [],   // 列表生成器
        offset: -1,
        total: 0,
        limit: 1,
        renderKey: 'id',
        query: {},

        enableSelection: false,     // 满足全选
        className: 'table-responsive',      // 容器的类名
        heightControl: '',
        prefixName: 'cat',  // 前缀
        TableStyle: ['bordered'],   // triped, condensed
        myHeadStyle: 'active',    // active, success, info, warning, danger
        batch: []
    }

    state = {
        selectAll: false,
        selected: [],
        filterName: {
            name: '',
            value: ''
        },
        data: [],
        orderFunc: {
            key: '',
            func: ()=>{},
            forward: true
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            data: this.props.rows
        });
    }

    // 接收新数据
    componentWillReceiveProps(nextProps) {
        this.setState({
            selectAll: false,
            selected: [],
            filterName: {
                name: '',
                value: ''
            },
            data: nextProps.rows,
            orderFunc: {
                key: '',
                func: ()=>{},
                forward: true
            }
        });
    }

    // 选中处理
    _handleSelect = (value) => {
        let { selectAll, selected, data } = this.state,
            { renderKey } = this.props;
        if (value === '-1') {
            selectAll = !selectAll;
            if (selectAll) {
                selected = _.map(data, renderKey);
            } else {
                selected = [];
            }
        } else {
            let index = _.indexOf(selected, value);
            if (index < 0) {
                selected.push(value);
            } else {
                selected.splice(index, 1);
            }
            if (selected.length === data.length && selected.length !== 0) {
                selectAll = true;
            } else {
                selectAll = false;
            }
        }
        this.setState({
            selectAll: selectAll,
            selected: selected
        });
    }

    // 分页处理
    // 对外输出offset
    _updatePage = (offset) => {
        let { query, limit } = this.props;
        this.props.rerender(offset * limit, query);
    }

    // 筛选处理
    _updateFilter = (filter, key) => {
        let { filterName } = this.state,
            { rows, columns } = this.props,
            data = [];
        filterName[key] = filter;
        data = this._filterData(filterName, rows, columns);

        this.setState({
            selectAll: false,
            selected: [],
            filterName: filterName,
            data: data
        });
    }

    // 筛选规则
    _filterData = (filterName, rows, thead) => {
        let self = this;
        if (filterName.value === '') {
            return rows;
        }
        return _.filter(rows, function(row) {
            if (filterName.name === '') {
                return _.some(thead, function(column) {
                    if (!column.name) {
                        return false;
                    }
                    return self._checkTd(filterName.value, row[column.name], column.renderer);
                });
            } else {
                let renderer = _.pluck(_.filter( thead, {name: filterName.name}), 'renderer')[0];
                return self._checkTd(filterName.value, row[filterName.name], renderer);
            }
            return true
        });
    }
    // 判断单元格的筛选
    _checkTd = (value, tdValue, renderer) => {
        tdValue = renderer !== undefined ? renderer(tdValue) : tdValue;
        if (tdValue.toString().indexOf(value) < 0) {
            return false;
        }
        return true;
    }

    _updateOrder = (orderFunc) => {
        this.setState({
            orderFunc: orderFunc
        });
    }

    render() {
        let { columns, prefixName, className, rows, offset, total, enableSelection, filter, heightControl, limit, renderKey, batch, TableStyle } = this.props,
            { selectAll, selected, filterName, data, orderFunc } = this.state,
            divStyle = heightControl !== '' ? {
                maxHeight: `${heightControl}px`
            } : {},
            tableClasses = ((style) => {
                let l = '';
                _.each(style, function(item) {
                    l += ` ${prefixName}-table-${item}`;
                });
                return l;
            })(TableStyle),
            tableClassName = `${prefixName}-table ${prefixName}-table-hover ${tableClasses}`;

        let orderedData = data.slice();
        if (orderFunc.key !== '') {
            orderedData.sort( (prev, next) => {
                let order = orderFunc.func(prev[orderFunc.key], next[orderFunc.key]);
                return orderFunc.forward ? order : !order;
            });
        }

        return (
            <div>
                <NavHeader
                    prefixName={prefixName}
                    selected={selected}
                    columns={columns}
                    enableSelection={enableSelection}
                    filter={filter}
                    filterName={filterName}
                    updateFilter={this._updateFilter}
                    batch={batch}
                />
                <div
                    className={`${prefixName}-${className}`}
                    style={divStyle}
                >
                    <table className={tableClassName}>
                        <GridHead
                            columns={columns}
                            enableSelection={enableSelection}
                            selectAll={selectAll}
                            myStyle={this.props.myHeadStyle}
                            onSelect={this._handleSelect}
                            orderFunc={orderFunc}
                            updateOrder={this._updateOrder}
                        />
                        <GridBody
                            rows={orderedData}
                            columns={columns}
                            enableSelection={enableSelection}
                            renderKey={renderKey}
                            selected={selected}
                            onSelect={this._handleSelect}
                            filter={filter}
                            filterName={filterName}
                        />
                    </table>
                </div>

                <NavFooter
                    prefixName={prefixName}
                    offset={offset}
                    update={this._updatePage}
                    limit={limit}
                    number={rows.length}
                    total={total}
                />
            </div>
        );
    }
};
