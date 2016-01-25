'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoComplete = function (_React$Component) {
    _inherits(AutoComplete, _React$Component);

    function AutoComplete(props) {
        _classCallCheck(this, AutoComplete);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoComplete).call(this, props));

        _this.state = {
            results: [],
            index: -1,
            showList: false,
            value: ''
        };
        return _this;
    }

    _createClass(AutoComplete, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {}
    }, {
        key: 'componentWillMonut',
        value: function componentWillMonut() {}
    }, {
        key: '_getResult',
        value: function _getResult(value) {
            _list = this._formatList();
        }
    }, {
        key: '_formatList',
        value: function _formatList() {
            var _this2 = this;

            var tempList = this.props.list;
            if (_lodash2.default.isArray(tempList)) {
                var _ret = function () {
                    var tempObj = {};
                    return {
                        v: _lodash2.default.map(tempList, function (value) {
                            if (_lodash2.default.isObject(value)) {
                                tempObj[_this2.props.valueName] = value[_this2.props.valueName];
                                tempObj[_this2.props.labelName] = value[_this2.props.labelName];
                                return tempObj;
                            }
                            tempObj[_this2.props.valueName] = value;
                            tempObj[_this2.props.labelName] = value;
                            return tempObj;
                        })
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            } else if (_lodash2.default.isObject(tempList)) {
                var _ret2 = function () {
                    var tempObj = {};
                    return {
                        v: _lodash2.default.map(tempList, function (value, key) {
                            tempObj[_this2.props.valueName] = value;
                            tempObj[_this2.props.labelName] = key;
                            return tempObj;
                        })
                    };
                }();

                if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(e) {
            this.setState({
                showList: true
            });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            this.setState({
                showList: false
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var value = e.target.value;
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state;
            var showList = _state.showList;
            var index = _state.index;
            var value = _state.value;

            var ulStyle = {
                display: showList ? 'block' : 'none'
            };
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', { type: 'text', value: this.props.value, onChange: this.handleChange }),
                _react2.default.createElement('ul', { style: ulStyle })
            );
        }
    }]);

    return AutoComplete;
}(_react2.default.Component);

AutoComplete.propTypes = {
    value: _react2.default.PropTypes.string,
    list: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]),
    valueName: _react2.default.PropTypes.string,
    labelName: _react2.default.PropTypes.string
};
AutoComplete.defaultProps = {
    value: '',
    list: [],
    valueName: 'value',
    labelName: 'label'
};
exports.default = AutoComplete;