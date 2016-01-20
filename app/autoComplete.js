
import React from 'react';

export default class AutoComplete extends React.component {

    static propTypes = {
        value: React.PropTypes.string,
        list: React.PropTypes.array
    };

    static defaultProps = {
        value: '',
        list: []
    };

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            index: -1,
            showList: false,
            value: ''
        };
    }

    render() {
        return;
    }
}
