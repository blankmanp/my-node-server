
import React from 'react';

export default class AutoComplete extends React.component {

    static propTypes = {
        value: React.PropTypes.string
    };

    static defaultProps = {
        value: ''
    };

    constructor(props) {
        super(props);
    }
}
