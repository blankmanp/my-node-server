import React, {Component} from 'react';
import _ from 'lodash';
import GridRow from './gridrow.js';

class GridBody extends Component {
    static propTypes = {
        columns: React.PropTypes.array,
        enableSelection: React.PropTypes.bool,
        selectAll: React.PropTypes.bool,
        renderKey: React.PropTypes.string
    }

    static defaultProps = {
        columns: [],
        enableSelection: false,
        selectAll: false,
        renderKey: 'id',
    }

    constructor(props) {
        super(props);
    }

    render () {
        let self = this;
        let { rows, columns, enableSelection, renderKey, selected } = this.props;

        return (
            <tbody>
                {rows.map(function(row, index) {
                    let key = row[renderKey] !== undefined ? row[renderKey] : index,
                        ifSelected = _.indexOf(selected, key) > -1;

                    return (
                        <GridRow
                            key={`grid-tr-${key}`}
                            row={row}
                            columns={columns}
                            info={{rowIndex: index, keyValue: key}}
                            enableSelection={enableSelection}
                            ifSelected={ifSelected}
                            onSelect={self.props.onSelect}
                        />
                    );
                })}
            </tbody>
        );
    }
};

export default GridBody;
