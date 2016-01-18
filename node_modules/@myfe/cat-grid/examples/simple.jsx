import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from '../src/grid.js';
import _ from 'lodash';
import '../assets/index.less';

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        }
    }

    _configPrepare() {
        return [{
            label: '#',
            name: 'id'
        }, {
            label: '影片名',
            name:'nm',
            className: 'col-red'
        }, {
            label: '上映日期',
            name: 'ct'
        }, {
            label: '人数',
            name: 'number'
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

    _changeData = () => {
        let time = new Date(),
            minute = time.getSeconds(),
            dataList = [],
            listNum = 0;
        while (listNum ++ <= 10) {
            dataList.push({
                id: `id-${listNum}-${minute}`,
                nm: '道士下山',
                number: 100,
                active: listNum % 2 === 0 ? true : false,
                ct: time
            });
        }
        this.setState({
            dataList: dataList
        });
    }

    render() {
        const headList = this._configPrepare();
        let { dataList} = this.state;
        console.log(dataList);

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
                    rerender={this._changeData}
                />
            </div>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('component-example-simple')); 
