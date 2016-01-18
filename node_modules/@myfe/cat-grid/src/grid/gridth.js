import React, { Component } from 'react';

class GridTh extends Component {
    static propTypes = {
        column: React.PropTypes.object,
        orderFunc: React.PropTypes.object
    }

    static defaultProps = {
        column: {},
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
        let { column } = this.props;
        this.props.handleOrder(column.name, column.orderBy);
    }

    render() {
        let { column, orderFunc } = this.props,
            self = this;

        return (
            <th>
                {column.label}
                {
                    (() => {
                        if (column.orderBy) {
                            let classes = orderFunc.key !== column.name ?
                                    'sort' :
                                    orderFunc.forward ?
                                        'sort-by-attributes' :
                                        'sort-by-attributes-alt';
                            return (
                                <i
                                    className={`glyphicon glyphicon-${classes}`}
                                    onClick={self._handleClick}
                                />
                            );
                        }
                    })()
                }
            </th>        
        );
    }
}

export default GridTh;
