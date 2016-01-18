import React, {Component} from 'react';
import GridTd from './gridtd.js';

class GridRow extends Component {
    static propTypes = {
        row: React.PropTypes.object,
        columns: React.PropTypes.array,
        info: React.PropTypes.object,
        enableSelection: React.PropTypes.bool,
        ifSelected: React.PropTypes.bool
    }

    static defaultProps = {
        row: {},
        columns: [],
        info: {},
        enableSelection: false,
        isSelected: false
    }

    constructor(props) {
        super(props); 
    }

    _handleClick = (event) => {
        this.props.onSelect(this.props.info.keyValue);
    }

    // 生成选择框
    renderSelection() {
        let { enableSelection, ifSelected} = this.props,
            iconClass = ifSelected ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked';
        if (!enableSelection) {
            return null;
        } else {
            return (
                <td onClick={this._handleClick} className="table-td-hover">
                    <i className={iconClass} />
                </td>        
            );
        }
    }

    render() {
        let { row, columns, info, ifSelected } = this.props;

        return (
            <tr>
                {this.renderSelection()}
                {
                    columns.map((column, index) => {
                        return (
                            <GridTd
                                key={`grid-td-${index}`}
                                row={row}
                                column={column}
                                info={info}
                                index={index}
                            />
                        );
                    })
                }
            </tr>
        );
    }
}

export default GridRow;
