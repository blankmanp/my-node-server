import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Datepicker from '../src/datepicker.js';
import '../assets/index.less';

class Example extends Component {
    state = {
        date: '2015-11-11 08:06:07'
    }

    onClick() {
        this.setState({
            date: '2015-11-11 08:06:07'
        });
    }
    
    handleChange = (newValue) => {
        console.log(newValue);
    }

    handleChangeTime = (newValue) => {
        this.setState({
            date: '2015-11-11 ' + newValue
        });
    }


    render() {
        return (
            <div>
                <button onClick={this.onClick.bind(this)}>还原</button>
                <Datepicker 
                    onChange={this.handleChange}
                    value={this.state.date}
                />
                <Datepicker 
                    onChange={this.handleChangeTime}
                    value={this.state.date}
                    format="HH:mm:ss"
                    timeOnly
                />
            </div>
        );
    }
};

ReactDOM.render(<Example />, document.getElementById('component-example-simple-active'));
