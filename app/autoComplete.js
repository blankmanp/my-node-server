
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

    handleChange(e) {
        let value = e.target.value;
    }

    render() {
        return (
            <div>
                <input type="text" value={this.props.value} onChange={this.handleChange} />
            </div>
        );
    }
}
