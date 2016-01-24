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

    componentWillReceiveProps() {}

    componentWillMonut() {}

    _list;

    _getResult(value) {

    }

    _formatList() {
        let tempList = this.props.list;
        if (_.isArray(tempList)) {
            let tempObj = {};
            return _.map(tempList, (value) => {
                if (_.isObject(value)) {
                    tempObj[this.props.valueName] = value[this.props.valueName];
                    tempObj[this.props.labelName] = value[this.props.labelName];
                    return tempObj;
                }
                tempObj[this.props.valueName] = value;
                tempObj[this.props.labelName] = value;
                return tempObj;
            });
        } else if (_.isObject(tempList)) {
            let tempObj = {};
            return _.map(tempList, (value, key) => {
                tempObj[this.props.valueName] = value;
                tempObj[this.props.labelName] = key;
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

    }

    render() {
        let { showList, index, value } = this.state;
        let ulStyle = {
            display: showList ? 'block' : 'none'
        };
        return (
            <div>
                <input type="text" value={this.props.value} onChange={this.handleChange} />
                <ul style={ulStyle}></ul>
            </div>
        );
    }
}
