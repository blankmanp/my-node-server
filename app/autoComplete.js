
import React from 'react';

export default class AutoComplete extends React.Component {

    static propTypes = {
        value: React.PropTypes.string,
        list: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object])
    };

    static defaultProps = {
        value: '',
        list: []
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
        return (
            <div>
                <input type="text" value={this.props.value} onChange={this.handleChange} />
            </div>
        );
    }
}
