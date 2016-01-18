import React, {Component} from 'react';

class GridTd extends Component {

    render() {
        let { row, column, info, index } = this.props,
            className = '',
            divStyle = {},
            content = row[column.name] !== undefined ? row[column.name].toString() : '';

        info.index = index;

        if (column.className) {
            if (typeof column.className === 'string') {
                className = column.className;
            } else {
                className = column.className(row[column.name], row, info);
            }
        }

        if (column.divStyle) {
            divStyle = column.divStyle(row[column.name], row, info);
        }

        if (column.renderer) {
            content = column.renderer(row[column.name], row, info);
        }

        return (
            <td className={className} style={divStyle}>
                {content}
            </td>    
        );
    }
}

export default GridTd;
