import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from '../src/grid.js';
import Dialog from '@myfe/cat-dialog';
import _ from 'lodash';
import '../assets/index.less';

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            show: false
        }
    }

    _configPrepare() {
        return [{
            label: 'Index',
            renderer: function(content, line, info) {
                return info.rowIndex;
            }
        }, {
            label: '影片名',
            name:'nm',
            className: 'col-red'
        }, {
            label: '上映日期',
            name: 'ct'
        }, {
            label: '有效',
            name: 'active'
        }, {
            label: '操作',
            renderer: function(content, line, info) {
                return '';
            }
        }];
    }

    _getData = () => {
        let time = new Date(),
            minute = time.getSeconds(),
            dataList = [],
            listNum = 0;
        while (listNum ++ <= 10) {
            dataList.push({
                nm: '道士下山',
                active: listNum % 2 === 0 ? true : false,
                ct: time.toString()
            });
        }
        return dataList;
    }

    _openDialog = () => {
        this.setState({
            show: true,
            dataList: this._getData()
        });
    }

    _closeDialog = () => {
        this.setState({
            show: false
        });
    }

    render() {
        const headList = this._configPrepare();
        let { dataList, show} = this.state;

        return (
            <div>
                <button className="btn btn-primary" onClick={this._openDialog}>
                    弹窗
                </button>
                <Dialog show={show} title="测试grid in dialog" mySize='large' onClose={this._closeDialog}>
                    <Grid
                        columns={headList}
                        rows={dataList}
                        limit={20}
                    />
                </Dialog>

            </div>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('component-example-destory')); 
