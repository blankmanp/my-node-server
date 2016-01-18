import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Datepicker from '../src/datepicker.js';
import '../assets/index.less';

class Example extends Component {
    handleChange = (newValue) => {
        console.log(newValue);
    }


    render() {
        return (
            <div>
                <p>默认使用方式</p>
                <Datepicker 
                    onChange={this.handleChange}
                />
                <Datepicker
                    onChange={this.handleChange}
                    disabled
                />
                <Datepicker
                    onChange={this.handleChange}
                    readOnly
                />
            </div>
        );
    }
};

ReactDOM.render(<Example />, document.getElementById('component-example-simple-disabled'));
