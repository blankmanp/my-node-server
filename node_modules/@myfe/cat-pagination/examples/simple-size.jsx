import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pagination from '../src/pagination.js';
import '../assets/index.less';

class Example extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        offset: 0
    }

    _updatePage = (offset) => {
        console.log(`收到 ${offset}`);
        this.setState({
            offset: offset
        });
    }

    render() {
        return (
            <div>
                <Pagination
                    offset={this.state.offset}
                    totalPage={16}
                    update={this._updatePage}
                    mySize="small"
                />
                <Pagination
                    offset={this.state.offset}
                    totalPage={16}
                    update={this._updatePage}
                />
                <Pagination
                    offset={this.state.offset}
                    totalPage={16}
                    update={this._updatePage}
                    mySize="large"
                />
            </div>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('component-example-simple-size'));
