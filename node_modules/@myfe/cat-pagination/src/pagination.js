/**
 *  Pagination的设计原则是
 *  @currentPage 当前页
 *  @totalPage 总页数
 *  @mySize 大小
 *  @myStyle 行列式还是固定式
 *  @prefixName 类名前缀
 *  todo: 目前每一次pagination是实时更新的，这样的用户体验可能不理想，我们想要的是总页数只在外界条件改变的时候更新，而每一次内部点击的时候，都仅仅进行内部的更新，所以内部的state需要维护，而不是每一次什么都由外部控制
 *
 **/
import React, { Component } from 'react';
import _ from 'lodash';
import Pager from './pager';

class Pagination extends Component {
    static propTypes = {
        offset: React.PropTypes.number,
        totalPage: React.PropTypes.number,

        mySize: React.PropTypes.string,
        myStyle: React.PropTypes.string,
        prefixName: React.PropTypes.string,
        update: React.PropTypes.func,
        maxSize: React.PropTypes.number,
        className: React.PropTypes.string
    }

    static defaultProps = {
        offset: 0,
        totalPage: -1,
        mySize: 'normal',    //large, normal, smal
        myStyle: 'omitted',     //fullsize, omitted, compressed
        prefixName: 'cat',
        maxSize: 10,
        className: ''
    }

    sizes = {
        large: 'lg',
        normal: '',
        small: 'sm'
    }

    state = {
        jump: ''
    }

    constructor(props) {
        super(props); 
    }

    // 点击事件
    _handleClick = (newPage) => {
        this.props.update(newPage);
    }

    // 输入数字
    _enter = (e) => {
        let value = e.target.value;
        if (value === '' || /\d$/.test(value)) {
            this.setState({
                jump: value
            });
        }
    }

    // 跳转
    _jump = (e) => {
        e.preventDefault();
        let { totalPage } = this.props,
            { jump } = this.state;
        if (jump !== '' && (totalPage === -1 || jump <= totalPage)) {
            this._handleClick(jump - 1);
            this.setState({
                jump: ''
            });
        }
    }

    // 生成列表数据
    _getList(myStyle, offset, totalPage) {
        let list = [],
            i = 0,
            start = 0,
            end = 1,
            maxSize = this.props.maxSize;

        if (totalPage === -1 || myStyle === 'compressed') {
            list.push({
                page: (offset + 1).toString() + ((myStyle === 'compressed' && totalPage !== 0) ? '/' + totalPage : ''),
                target: offset
            });
        } else if (myStyle === 'fullsize' || totalPage < maxSize) {
            while(i < totalPage) {
                list.push({
                    page: (i + 1).toString(),
                    target: i
                });
                i ++;
            }
        } else {
            start = offset - maxSize/2;
            start = start > totalPage - maxSize - 2 ? totalPage - maxSize - 2 : start;
            start = start < 0 ? 0 : start;
            while (i < maxSize && start < totalPage - 3) {
                list.push({
                    page: (start + 1).toString(),
                    target: start
                });
                start ++;
                i ++;
            }
            if (i === maxSize) {
                list.push({
                    page: '···',
                    target: -1
                });
            } else {
                list.push({
                    page: (totalPage - 2).toString(),
                    target: totalPage -3
                }, {
                    page: (totalPage - 1).toString(),
                    target: totalPage -2
                });
            }
            list.push({
                page: totalPage.toString(),
                target: totalPage - 1
            });
        }
        list.unshift({
            page: '〈 上一页',
            target: offset - 1
        });
        list.push({
            page: '下一页 〉',
            target: offset + 1
        });
        return list;
    }

    render() {
        let { prefixName, mySize, myStyle, className, totalPage, offset, maxSize} = this.props,
            { jump } = this.state,
            classes = `${prefixName}-pagination ${prefixName}-pagination-${this.sizes[mySize]} ${className}`,
            self = this,
            list = this._getList(myStyle, offset, totalPage);

        return (
            <ul className={classes}>
                {
                    _.map(list, function(item) {
                        return (
                            <Pager
                                page={item.page}
                                key={item.page}
                                target={item.target}
                                offset={offset}
                                totalPage={totalPage}
                                handleClick={self._handleClick}
                            />
                        );
                    })
                }
                {
                    (() => {
                        if (totalPage === -1 || totalPage > maxSize) {
                            let jumps = [
                                <li key="jumpText" className="text-container">
                                    <span>
                                        到第
                                        <input
                                            type="text"
                                            onChange={self._enter}
                                            value={jump}
                                        />
                                        页
                                    </span>
                                </li>,
                                <li key="jumpButton">
                                    <a onClick={self._jump} className="jump-button" href="#">
                                        确定
                                    </a>
                                </li>
                            ];
                            return jumps;
                        } else {
                            return null;
                        }
                    })()
                }
            </ul>
        );
    }
};

export default Pagination;
