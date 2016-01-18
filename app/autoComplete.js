
import React from 'react';

export default class AutoComplete extends React.component {
    constructor(props) {
        super(props);
    }
}

AutoComplete.propsType = {
    autoCompleteData: React.PropTypes.array.isRequired
};

AutoComplete.defaultProps = {
    autoCompleteData: ['abadon', 'abc', 'apple', 'test', 'fun', 'hhh']
};
