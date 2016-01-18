import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Datepicker from '../src/datepicker.js';
import '../assets/index.less';

class Example extends Component {
    constructor(props) {
        super(props);
    }

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
                    showNow
                />  

                <p>默认情况下不显示数值</p>
                <Datepicker 
                    noValue
                    onChange={this.handleChange}
                />
            </div>
        );
    }
};

ReactDOM.render(<Example />, document.getElementById('component-example-simple'));
