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
            <Pagination
                offset={this.state.offset}
                totalPage={20}
                update={this._updatePage}
            />
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('component-example-simple'));
