import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@myfe/cat-button';
import Sweet from '../src/index.js';
import '../assets/index.less';

class Example extends Component {
    onAlert = () => {
        Sweet.alert('你说啥');
    }
    onAlert1 = () => {
        Sweet.alert('你说啥', '好吧', 'success');
    }
    onAlert2 = () => {
        Sweet.alert('别乱动手', 'warning');
    }
    onAlert3 = () => {
        Sweet.alert('你说啥', '好吧', '好吧', 'danger');
    }
    
    onConfirm(info) {
        Sweet.confirm(info , function(confirm) {
            setTimeout(function() {
                Sweet.alert('你刚刚点击了' + confirm);
            }, 500);
        });
    }
    onPrompt(info) {
        Sweet.prompt(info, function(text) {
            console.log(text);
        });
    }

    render() {
        return (
            <div>
                <Button onClick={this.onAlert}>
                    alert
                </Button>
                <Button
                    onClick={this.onAlert1}
                    myStyle="success"
                >
                    alert
                </Button>
                <Button
                    onClick={this.onAlert2}
                    myStyle="warning"
                >
                    alert
                </Button>
                <Button
                    onClick={this.onAlert3}
                    myStyle="danger"
                >
                    alert
                </Button>

                <hr />

                <Button
                    onClick={this.onConfirm.bind(null, {
                        title:'你说甚'
                    })}
                >
                    confirm
                </Button>
                <Button
                    onClick={this.onConfirm.bind(null, {
                        title:'你说甚',
                        text: 'XXX',
                        style:'success',
                        closeText: 'Cancel',
                        confirmText: 'Confirm'
                    })}
                    myStyle="success"
                >
                    confirm
                </Button>
                <Button
                    onClick={this.onConfirm.bind(this,{
                        title:'你说甚',
                        text: 'XXX',
                        style:'danger',
                        cancelText: 'Cancel',
                        confirmText: 'Confirm',
                        cancelFunction: true
                    })}
                    myStyle="danger"
                >
                    confirm
                </Button>

                <hr />

                <Button
                    onClick={this.onPrompt.bind(this, {
                        title:'好吧',
                        text: '写点什么呗',
                        inputPlaceholder: '测试',
                        value: '123'
                    })}
                >
                    prompt
                </Button>
            </div>
        );
    }
}; 

ReactDOM.render(<Example />, document.getElementById('component-example-simple'));
