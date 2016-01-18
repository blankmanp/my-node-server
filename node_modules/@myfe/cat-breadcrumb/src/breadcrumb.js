import React, {Component} from 'react';
import Crumb from './crumb';

class BreadCrumb extends Component {
    static propTypes = {
        prefixName: React.PropTypes.string
    }

    static defaultProps = {
        prefixName: 'cat'
    }

    _renderContent() {
        return React.Children.map(this.props.children, child => {
            return child;
        });
    }

    render() {
        let { prefixName } = this.props;
        return (
            <ol className={`${prefixName}-breadcrumb`}>
                {this._renderContent()}
            </ol>
        );
    }
}

BreadCrumb.Crumb = Crumb;

export default BreadCrumb;
