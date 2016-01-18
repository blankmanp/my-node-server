import React, {Component} from 'react';
import _ from 'lodash';
import GridTh from './gridth.js';

class GridHead extends Component {
    static propTypes = {
        columns: React.PropTypes.array,
        enableSelection: React.PropTypes.bool,
        selectAll: React.PropTypes.bool,
        myStyle: React.PropTypes.string,
        order: React.PropTypes.bool,
        orderFunc: React.PropTypes.object
    }

    static defaultProps = {
        columns: [],
        enableSelection: false,
        selectAll: false,
        myStyle: 'active',
        order: false,
        orderFunc: {
            key: '',
            func: ()=>{},
            forward: true
        }
    }

    constructor(props) {
        super(props);
    }

    _handleClick = (event) => {
        this.props.onSelect('-1');
    }

    _handleOrder = (newKey, func) => {
        let { orderFunc } = this.props;
        if (orderFunc.key !== newKey) {
            orderFunc = {
                key: newKey,
                func: func,
                forward: true
            }
        } else if (orderFunc.forward) {
            orderFunc.forward = false;
        } else {
            orderFunc = {
                key: '',
                func: ()=>{},
                forward: true
            }
        }

        this.props.updateOrder(orderFunc);

    }

    renderSelection() {
        let { enableSelection, selectAll } = this.props,
            iconClass = selectAll ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked';
        if (!enableSelection) {
            return null;
        } else {
            return (
                <th onClick={this._handleClick} className="table-th-hover">
                    <i className={iconClass} />
                </th>        
            );
        }
    }

    render() {
        let { columns, orderFunc, myStyle } = this.props,
            self = this;

        return (
            <thead>
                <tr className={myStyle}>
                    {this.renderSelection()}
                    {
                        _.map(columns, function(column) {
                            return (
                                <GridTh
                                    key={column.label}
                                    column={column}
                                    orderFunc={orderFunc}
                                    handleOrder={self._handleOrder}
                                />
                            );  
                        })
                    }
                </tr>
            </thead>
        );
    }
};

export default GridHead;
