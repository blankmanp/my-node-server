import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../src/dialog.js';

class Example extends Component {
    state = {
        show: false,
        tabshow: false
    }

    On() {
        this.setState({
            show:true
        });
    }

    Cn() {
        console.log('正在关闭');
        this.setState({
            show:false
        });
    }

    render() {
        return (
            <div>
                <button
                    onClick={this.On.bind(this)}
                >
                    开启
                </button>
                <Dialog
                    show={this.state.show}
                    title={null}
                    onClose={this.Cn.bind(this)}
                >
                    <p>测试</p>
                </Dialog>
            </div>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('component-example-simple'));
