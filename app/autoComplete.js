
import React from 'react';

export default class AutoComplete extends React.component {

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

    componentWillMonut() {}

    componentWillReceiveProps() {}

    handleChange() {}

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleChange} />
            </div>
        );
    }
}
