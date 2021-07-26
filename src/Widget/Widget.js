import React from 'react';
import PropTypes from 'prop-types';
import Button, { ButtonStateEnum } from './Button';
import { throttle } from './Utils/Common';
import { SCROLL_THROTTLE_TIMEOUT_MS } from './Constants';
import './Widget.css';

class Widget extends React.Component {
    constructor(props) {
        super(props);

        this.buttonRef = React.createRef();

        this.handleDocumentScroll = throttle(this.handleDocumentScroll, SCROLL_THROTTLE_TIMEOUT_MS);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleDocumentScroll);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleDocumentScroll);
    }

    handleDocumentScroll = () => {
        const button = this.buttonRef.current;
        if (!button) return;

        button.tryClose();
    };

    handleDefault = () => {
        this.goToState(ButtonStateEnum.default);
    };

    handleExpanded = () => {
        this.goToState(ButtonStateEnum.expanded);
    };

    handleOpened = () => {
        this.goToState(ButtonStateEnum.opened);
    };

    handleHidden = () => {
        this.goToState(ButtonStateEnum.hidden);
    };

    goToState(state) {
        const button = this.buttonRef.current;

        button.goToState(state);
    }

    render() {
        const { params } = this.props;
        if (!params) return null;

        const { items } = params;
        if (!items) return null;
        if (!items.length) return null;

        return (
            <div className='widget'>
                <button onClick={this.handleOpened}>Opened</button>
                <button onClick={this.handleDefault}>Default</button>
                <button onClick={this.handleExpanded}>Expanded</button>
                <button onClick={this.handleHidden}>Hidden</button>

                <Button ref={this.buttonRef} items={items}/>
            </div>
        );
    }
}

Widget.propTypes = {
    params: PropTypes.object.isRequired
};

export default Widget;