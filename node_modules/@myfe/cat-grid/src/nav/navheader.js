import React, { Component } from 'react';
import Filter from './filter.js';
import Buttons from './buttons.js';

export default class NavHeader extends Component {
    static propTypes = {
        prefixName: React.PropTypes.string,

        selected: React.PropTypes.array,
        enableSelection: React.PropTypes.bool,

        filter: React.PropTypes.bool,
        filterName: React.PropTypes.object,
        columns: React.PropTypes.array,

        batch: React.PropTypes.array
    }
    static defaultProps = {
        prefixName: 'cat',
        enableSelection: false,
        selected: [],

        filter: false,
        filterName: {},
        columns: [],

        batch: []
    }

    constructor(props) {
        super(props); 
    }

    render() {
        let { prefixName, enableSelection, filter, filterName, columns, updateFilter, batch, selected } = this.props,
            self = this;
        if (!filter && !enableSelection) {
            return null;
        }
        return (
            <nav className={`${prefixName}-table-header clearfix`}>
                {
                    (() => {
                        if (filter) {
                            return (
                                <Filter
                                    columns={columns}
                                    prefixName={prefixName}
                                    filterName={filterName}
                                    updateFilter={updateFilter}
                                />
                            )
                        }
                    })()
                }
                {
                    (() => {
                        if (enableSelection) {
                            return (
                                <Buttons
                                    prefixName={prefixName}
                                    batch={batch}
                                    selected={selected}
                                />
                            );
                        }
                    })()
                }
            </nav>        
        )
    }
}
