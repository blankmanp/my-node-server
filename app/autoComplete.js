/*
* @Author: pengyanxin
* @Date:   2016-01-18 15:39:12
* @Last Modified by:   pengyanxin
* @Last Modified time: 2016-01-18 15:48:44
*/

import React from 'react';

export default class AutoComplete extends React.component {
    constructor(props) {
        super(props);
    }
}

AutoComplete.propsType = {
    autoCompleteData: React.PropTypes.array.isRequired
}
AutoComplete.defaultProps = {
    autoCompleteData: ['abadon', 'abc', 'apple', 'test', 'fun', 'hhh']
}
