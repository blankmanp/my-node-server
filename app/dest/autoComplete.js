'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoComplete = function (_React$component) {
    _inherits(AutoComplete, _React$component);

    function AutoComplete(props) {
        _classCallCheck(this, AutoComplete);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AutoComplete).call(this, props));
    }

    return AutoComplete;
}(_react2.default.component);

exports.default = AutoComplete;

AutoComplete.propsType = {
    autoCompleteData: _react2.default.PropTypes.array.isRequired
};

AutoComplete.defaultProps = {
    autoCompleteData: ['abadon', 'abc', 'apple', 'test', 'fun', 'hhh']
};