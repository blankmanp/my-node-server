/*
* @Author: pengyanxin
* @Date:   2016-01-15 15:19:19
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-01-26 14:47:12
*/

import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './autoComplete';


ReactDOM.render(
    <AutoComplete value="lalala" list={[1, 11, 112, 113, 123]} />,
    document.getElementsByClassName('container')[0]
);
