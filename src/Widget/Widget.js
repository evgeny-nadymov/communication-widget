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

        this.state = {
            config: null
        };

        this.handleDocumentScroll = throttle(this.handleDocumentScroll, SCROLL_THROTTLE_TIMEOUT_MS);
    }

    async componentDidMount() {
        try {
            const response = await fetch('config.json', { method: 'POST', redirect: 'follow'});
            const config = await response.json();

            this.setState({ config }, () => {
                this.attachScroll();
            });

        } catch (e) {
            console.error('[config] fetch', e);
        }
    }

    componentWillUnmount() {
        this.detachScroll();
    }

    attachScroll() {
        const { config } = this.state;
        if (!config) return;

        const { rootName } = config;
        if (rootName) {
            const root = document.getElementById(rootName);
            if (root) {
                root.addEventListener('scroll', this.handleScroll);

                return;
            }
        }

        document.addEventListener('scroll', this.handleScroll);
    }

    detachScroll() {
        const { config } = this.state;
        if (!config) return;

        const { rootName } = config;
        if (rootName) {
            const root = document.getElementById(rootName);
            if (root) {
                root.removeEventListener('scroll', this.handleScroll);

                return;
            }
        }

        document.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
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
        const { config } = this.state;
        if (!config) return null;

        const { label, items } = config;
        if (!items) return null;
        if (!items.length) return null;

        return (
            <div className='widget'>
                <button onClick={this.handleOpened}>Opened</button>
                <button onClick={this.handleDefault}>Default</button>
                <button onClick={this.handleExpanded}>Expanded</button>
                <button onClick={this.handleHidden}>Hidden</button>

                <Button ref={this.buttonRef} label={label || 'Message Us'} items={items}/>
            </div>
        );
    }
}

Widget.propTypes = {

};

export default Widget;