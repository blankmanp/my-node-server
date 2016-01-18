import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from '../src/grid.js';
import _ from 'lodash';
import '../assets/with-pagination.less';

class Example extends Component {

    state = {
        dataList: [],
        offset: 0,
        total: 0
    }

    _configPrepare() {
        return [{
            label: '#',
            name: 'id',
            divStyle: function(value, line, info) {
                return {
                    backgroundColor: info.rowIndex % 2 === 0 ? '#bbb' : 'white'
                }
            },
            orderBy: function(pre, next) {
                return pre - next;
            }
        }, {
            label: '影片名',
            name:'nm',
            className: 'col-red'
        }, {
            label: '上映日期',
            name: 'ct',
            className: function(value, line, info) {
                return info.rowIndex % 2 === 0 ? 'col-blue' : '';
            }
        }, {
            label: '有效',
            name: 'active',
            renderer: function(value) {
                return value ? '有效' : '无效';
            }
        }, {
            label: '观影',
            name: 'people',
            orderBy: function(pre, next) {
                return pre - next;
            }
        }, {
            label: '操作',
            renderer: function(value, line, info) {
                return (
                    <a href="http://meituan.com?id={value}">链接</a>        
                );
            }
        }];
    }

    _changeData = (offset, query) => {
        console.log('触发更新' + offset);
        let time = new Date(),
            minute = time.getSeconds(),
            dataList = [],
            listNum = 0;
        while (listNum ++ < 20) {
            dataList.push({
                id: `id-${listNum}-${minute}`,
                nm: '道士下山',
                active: listNum % 2 === 0 ? true : false,
                ct: time.toString(),
                people: _.random(1, 10000)
            });
        }

        if (typeof offset !== 'number') {
            this.setState({
                dataList: dataList,
                total: _.random(100, 1000),
                offset: 0
            });
        } else {
            this.setState({
                dataList: dataList,
                offset: offset
            });
        }
    }

    _groupFunc = (ids, infos) => {
        console.log(ids);
    }

    render() {
        const headList = this._configPrepare();
        let { dataList, offset, total} = this.state;

        return (
            <div>
                <button
                    className="btn btn-primary"
                    onClick={this._changeData}
                >
                    更新数据
                </button>
                <Grid
                    columns={headList}
                    rows={dataList}
                    offset={offset}
                    total={total}
                    rerender={this._changeData}
                    limit={20}
                    renderKey="id"
                    heightControl="500"
                    filter
                    enableSelection
                    query={{'ids': '1', 'names': 'hello'}}
                    batch={[
                        {
                            name: '删除',
                            myStyle: 'primary',
                            onClick: this._groupFunc,
                        },
                        {
                            icon: 'glyphicon glyphicon-trash',
                            onClick: this._groupFunc
                        }
                    ]}
                />
            </div>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('component-example-advance')); 
