import React from 'react';
import _ from 'lodash';

export default class AutoComplete extends React.Component {

    static propTypes = {
        value: React.PropTypes.string,
        list: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
        valueName: React.PropTypes.string,
        labelName: React.PropTypes.string
    };

    static defaultProps = {
        value: '',
        list: [],
        valueName: 'value',
        labelName: 'label'
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

    componentWillMount() {
        this._list = this._formatList();
        this._getResult(this.props.value);
    }

    componentWillReceiveProps() {}

    _list;

    _getResult(inputValue) {
        let { valueName, labelName } = this.props;
        let result = [];
        _.forEach(this._list, (item) => {
            if (item[labelName].indexOf(inputValue) !== -1) {
                result.push(item);
            }
        });
        this.setState({
            value: inputValue,
            results: result
        });
    }

    _formatList() {
        let { valueName, labelName, list } = this.props;
        if (_.isArray(list)) {
            return _.map(list, (value) => {
                let tempObj = {};
                if (_.isObject(value)) {
                    tempObj[valueName] = '' + value[valueName];
                    tempObj[labelName] = '' + value[labelName];
                    return tempObj;
                }
                tempObj[valueName] = '' + value;
                tempObj[labelName] = '' + value;
                return tempObj;
            });
        } else if (_.isObject(list)) {
            return _.map(list, (value, key) => {
                let tempObj = {};
                tempObj[valueName] = '' + value;
                tempObj[labelName] = '' + key;
                return tempObj;
            });
        }
    }

    handleFocus(e) {
        this.setState({
            showList: true
        });
    }

    handleBlur(e) {
        this.setState({
            showList: false
        });
    }

    handleChange(e) {
        let value = e.target.value;
        this._getResult(value);
    }

    render() {
        let { showList, index, value, results } = this.state;
        let ulStyle = {
            display: showList && results.length ? 'block' : 'none'
        };
        let { valueName, labelName } = this.props;
        return (
            <div onFocus={this::this.handleFocus}
                onBlur={this::this.handleBlur}
                className="autoComplete"
            >
                <input type="text" value={value} onChange={this::this.handleChange} />
                <ul style={ulStyle}>
                    {
                        _.map(results, (item, itemIndex) => {
                            return <li key={itemIndex}>{`${item[labelName]}`}</li>;
                        })
                    }
                </ul>
            </div>
        );
    }
}
