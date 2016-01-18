import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tab from '../src/tab.js';

import '../assets/index.less';

class Example extends Component{

    render() {
        return (
            <div>
                <Tab liveKey="1">
                    <Tab.Panel eventKey="1" tab="Tab1">1</Tab.Panel>
                    <Tab.Panel eventKey="2" tab={<span><i className="glyphicon glyphicon-tags"></i>Tab2</span>}>2</Tab.Panel>
                </Tab>

                <hr/>

                <Tab liveKey="1" myStyle="pills">
                    <Tab.Panel eventKey="1" tab="Tab1" />
                    <Tab.Panel eventKey="2" tab="Tab2" />
                    <Tab.Panel eventKey="3" tab="Tab3" disabled />
                </Tab>
                <Tab liveKey="1" myStyle="pills">
                    <Tab.Panel eventKey="1" tab="Tab1">1</Tab.Panel>
                    <Tab.Panel eventKey="2" tab="Tab2">2</Tab.Panel>
                    <Tab.Panel eventKey="3" tab="Tab3" disabled>3</Tab.Panel>
                </Tab>
                <Tab liveKey="1" myStyle="pills" stacked>
                    <Tab.Panel eventKey="1" tab="Tab1">1</Tab.Panel>
                    <Tab.Panel eventKey="2" tab="Tab2">2</Tab.Panel>
                    <Tab.Panel eventKey="3" tab="Tab3" disabled>3</Tab.Panel>
                </Tab>

                <hr/>

                <Tab liveKey="1" justified>
                    <Tab.Panel eventKey="1" tab="Tab1">1</Tab.Panel>
                    <Tab.Panel eventKey="2" tab="Tab2">2</Tab.Panel>
                    <Tab.Panel eventKey="3" tab="Tab3" disabled>3</Tab.Panel>
                </Tab>
                <Tab liveKey="1" myStyle="pills" justified>
                    <Tab.Panel eventKey="1" tab="Tab1">1</Tab.Panel>
                    <Tab.Panel eventKey="2" tab="Tab2">2</Tab.Panel>
                    <Tab.Panel eventKey="3" tab="Tab3" disabled>3</Tab.Panel>
                </Tab>

            </div>
        );
    }
};

ReactDOM.render(<Example />, document.getElementById('component-example-style'));
