'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_test2.default, { value: 1 }), document.getElementsByClassName('container')[0]); /*
                                                                                                                                         * @Author: pengyanxin
                                                                                                                                         * @Date:   2016-01-15 15:19:19
                                                                                                                                         * @Last Modified by:   pengyanxin
                                                                                                                                         * @Last Modified time: 2016-01-18 15:33:17
                                                                                                                                         */