import React from 'react';
import _ from 'lodash';

export default class Todo extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.displayName = 'Todo';
        this.state = {};
    }

    componentWillMount() {}

    componentWillUnmount() {}

    handleKeyPress() {}

    handleClick() {}

    handleDelete() {}

    handleAdd() {}

    render() {
        return (
            <div>
                <input type="text" name="inputTodo" />
            </div>
        );
    }
}
