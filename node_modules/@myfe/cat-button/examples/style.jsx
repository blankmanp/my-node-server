import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../src/button.js';

class Example extends Component {

    render() {
        return (
            <div>
                <Button className="text">User Defined ClassName</Button>

                <hr />

                <Button myStyle="primary">Primary</Button>
                <Button myStyle="success">Success</Button>
                <Button myStyle="info">Info</Button>
                <Button myStyle="warning">Warning</Button>
                <Button myStyle="danger">Danger</Button>

                <hr />

                <Button myStyle="link">Link liked Button</Button>
                <Button href="https://github.com/MYFE-React-Component">Button liked Link</Button>
                <Button href="https://github.com/MYFE-React-Component" myStyle="link">Link liked Link</Button>
            </div>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('component-example-style')); 
