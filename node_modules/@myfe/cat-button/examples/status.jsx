import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../src/button.js';

class Example extends Component {
    state = {
        loading: true
    }

    Cn() {
        alert('你点击了按钮');
        this.setState({
            loading: !this.state.loading
        });
    }

    render() {
        return (
            <div>
                <Button active onClick={this::this.Cn}>Active</Button>
                <Button disabled onClick={this::this.Cn}>Disabled Button</Button>
                <Button loading={this.state.loading} onClick={this::this.Cn}>Loading</Button>
                <hr/>
                <Button disabled href="https://github.com/MYFE-React-Component">Disabled Link</Button>
            </div>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('component-example-status')); 
