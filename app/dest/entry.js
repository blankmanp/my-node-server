'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _autoComplete = require('./autoComplete');

var _autoComplete2 = _interopRequireDefault(_autoComplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_autoComplete2.default, { value: 'lalala' }), document.getElementsByClassName('container')[0]); /*
                                                                                                                                                        * @Author: pengyanxin
                                                                                                                                                        * @Date:   2016-01-15 15:19:19
                                                                                                                                                        * @Last Modified by:   blankmanp
                                                                                                                                                        * @Last Modified time: 2016-01-21 15:32:02
                                                                                                                                                        */