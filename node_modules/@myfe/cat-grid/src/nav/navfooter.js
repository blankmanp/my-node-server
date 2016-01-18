import React, { Component } from 'react';
import Pagination from '@myfe/cat-pagination';

export default class NavFooter extends Component {
    static propTypes = {
        prefixName: React.PropTypes.string,
        offset: React.PropTypes.number,
        limit: React.PropTypes.number,
        number: React.PropTypes.number,
        total: React.PropTypes.number,
        paginationStyle: React.PropTypes.string
    }

    static defaultProps = {
        prefixName: 'cat',
        offset: -1,
        limit: 1,
        number: 0,
        total: 0,
        paginationStyle: 'omitted'
    }

    _updatePage = (newPage) => {
        this.props.update(newPage);
    }

    render() {
        let { prefixName, offset, limit, number, total, paginationStyle } = this.props,
            totalPage = (total && limit) ? Math.ceil(total / limit) : -1;

        return (
            <nav className={`${prefixName}-table-footer clearfix`}>
                <div className={`${prefixName}-table-footnote pull-left`}>
                    {
                        (total !== 0 || number !== 0) &&
                            <span> 共{total !== 0 ? total : number }条数据  </span>
                    }
                    {
                        number !== 0 && offset !== -1 &&
                            <span>当前显示{offset + 1}-{offset + number}条</span>
                    }
                </div>
                {
                    offset !== -1 &&
                        <Pagination
                            offset={offset/limit}
                            totalPage={totalPage}
                            myStyle={paginationStyle}
                            update={this._updatePage}
                            className="pull-right"
                            mySize="small"
                        />
                }
            </nav>
        )
    }
}
