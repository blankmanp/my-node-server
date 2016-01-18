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
                <p>自定义格式, format只影响结果，不影响交互</p>
                <Datepicker 
                    format="YYYY-MM"
                    onChange={this.handleChange}
                />
                <Datepicker 
                    format="YYYY-MM HH:mm:ss"
                    onChange={this.handleChange}
                />

                <p>年月、时间控制,yearOnly\monthOnly只影响交互，不影响结果，因此需要配合format</p>
                <Datepicker 
                    yearOnly
                    format="YYYY"
                    onChange={this.handleChange}
                />
                <Datepicker 
                    monthOnly
                    format="YYYY-MM"
                    onChange={this.handleChange}
                />
                <Datepicker 
                    format="YYYY-MM-DD HH:mm:ss"
                    dateOnly={false}
                    onChange={this.handleChange}
                />
                <Datepicker 
                    format="HH:mm:ss"
                    timeOnly
                    showNow
                    onChange={this.handleChange}
                />
            </div>
        );
    }
};

ReactDOM.render(<Example />, document.getElementById('component-example-simple-format'));
