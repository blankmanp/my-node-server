import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from '..';
import request from 'superagent';

import '../less/autoComplete.less';

class Example extends React.Component {

    state = {
        a: 337380
    };

    options = [{"value":344185,"label":"1965"},{"value":247355,"label":"1066"},{"value":249343,"label":"1980年代的爱情"},{"value":337415,"label":"1和2"},{"value":341427,"label":"18爱不爱之怦然心动"},{"value":337380,"label":"17岁的别离"},{"value":260942,"label":"1915"},{"value":345339,"label":"12号收尸队"},{"value":248014,"label":"18岁，18天"},{"value":337680,"label":"14岁任性"},{"value":269059,"label":"1944"},{"value":246484,"label":"12金鸭"},{"value":338315,"label":"14+"},{"value":336706,"label":"12猴子"},{"value":249188,"label":"13"}]

    _changeHandler(value) {
        this.setState({a:value})
    }

    render() {
        return <AutoComplete value={this.state.a}/>
    }
}


ReactDOM.render(<Example />, document.getElementById('component-example-select'));
