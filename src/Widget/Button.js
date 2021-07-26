import React from 'react';
import PropTypes from 'prop-types';
import ButtonIcon from './ButtonIcon';
import Item from './Item';
import Popup from './Popup';
import PopupItem from './PopupItem';
import { ReactComponent as SMS } from './Assets/Sms.svg';
import { ReactComponent as Close } from './Assets/Close.svg';
import { BUTTON_DEFAULT_STATE_TIMEOUT_MS } from './Constants';
import './Button.css';

export const ButtonStateEnum = Object.freeze({
    hidden: 0,
    default: 1,
    expanded: 2,
    opened: 3
});

class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonState: ButtonStateEnum.hidden
        };

        this.buttonEnter = false;
        this.popupEnter = false;
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.buttonState !== this.state.buttonState;
    }

    componentDidMount() {
        setTimeout(() => {
            this.goToState(ButtonStateEnum.expanded);
        }, 225);
    }

    goToState = buttonState => {
        const { items } = this.props;
        const { buttonState: prevButtonState } = this.state;

        if (buttonState === ButtonStateEnum.hidden) {
            if (prevButtonState === ButtonStateEnum.expanded) {
                this.setState({
                    buttonState: ButtonStateEnum.default
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            buttonState
                        });
                    }, 225);
                });

                return;
            }
            if (prevButtonState === ButtonStateEnum.opened) {
                this.setState({
                    buttonState: ButtonStateEnum.default
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            buttonState
                        });
                    }, 30 * items.length + 30);
                });

                return;
            }
        }

        this.setState({
            buttonState
        });
    };

    closePopup = () => {
        const { buttonState } = this.state;
        if (buttonState !== ButtonStateEnum.opened) return;

        this.goToState(ButtonStateEnum.default);
    };

    handlePopupItemClick = (e, info) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (!info) return;

        const { url } = info;

        window.open(url, '_blank');

        this.closePopup();
    };

    handleClick = () => {
        const { buttonState } = this.state;

        switch (buttonState) {
            case ButtonStateEnum.hidden: {
                return;
            }
            case ButtonStateEnum.expanded: {
                this.goToState(ButtonStateEnum.opened);
                return;
            }
            case ButtonStateEnum.opened: {
                this.goToState(ButtonStateEnum.default);
                return;
            }
            default: {
                this.goToState(ButtonStateEnum.opened);
                return;
            }
        }
    };

    get isMouseOver() {
        return this.buttonEnter || this.popupEnter;
    }

    get hasDefaultState() {
        return this.state.buttonState === ButtonStateEnum.default;
    }

    handleButtonMouseEnter = () => {
        this.buttonEnter = true;

        const { buttonState } = this.state;
        if (buttonState !== ButtonStateEnum.default) return;

        this.goToState(ButtonStateEnum.expanded);
    }

    handleButtonMouseLeave = () => {
        this.buttonEnter = false;
        this.tryClose();
    }

    handlePopupMouseEnter = () => {
        this.popupEnter = true;
    }

    handlePopupMouseLeave = () => {
        this.popupEnter = false;
        this.tryClose();
    }

    tryClose() {
        const { isMouseOver, hasDefaultState } = this;
        if (isMouseOver) return;
        if (hasDefaultState) return;

        this.timer = setTimeout(() => {
            if (this.isMouseOver) return;
            if (this.hasDefaultState) return;

            this.goToState(ButtonStateEnum.default);
        }, BUTTON_DEFAULT_STATE_TIMEOUT_MS);
    }

    render() {
        let { items } = this.props;
        const { buttonState } = this.state;

        let width = null;
        let popup = null;
        let className;
        let quickItems = items;
        let moreInfo = null;
        switch (buttonState) {
            case ButtonStateEnum.hidden: {
                className = 'widget-button-hidden';

                break;
            }
            case ButtonStateEnum.expanded: {
                className = 'widget-button-expanded';

                quickItems = items.filter(x => x.quick);
                moreInfo = null; //quickItems.length < items.length ? { id: -1, '@type': 'more', name: 'More', quick: true, url: '' } : null;
                width = 16 + 0 + 32 * quickItems.length + (moreInfo ? 32 : 0) + 8 + 75 + 16;
                break;
            }
            case ButtonStateEnum.opened: {
                className = 'widget-button-opened';
                popup = (
                    <div className='widget-button-popup'>
                        {items.map(x => <PopupItem key={x.id} info={x} onClick={this.handlePopupItemClick}/>)}
                    </div>
                );
                break;
            }
            default: {
                className = '';
            }
        }

        return (
            <>
                <div
                    className='widget-button-background'
                    onMouseEnter={this.handleButtonMouseEnter}
                    onMouseLeave={this.handleButtonMouseLeave}>
                    <button
                        className={'widget-button' + (className ? ' ' + className : '')}
                        style={{ width }}
                        onClick={this.handleClick}>
                        <ButtonIcon icon={<SMS/>} openIcon={<Close/>} open={buttonState === ButtonStateEnum.opened}/>
                        <div className='widget-button-items'>
                            {quickItems.map(x => <Item key={x.id} info={x} onClick={this.handlePopupItemClick}/>)}
                            {Boolean(moreInfo) && <Item info={moreInfo} onClick={() => { }}/>}
                            <div className='widget-button-title'>Message Us</div>
                        </div>
                    </button>
                </div>
                <Popup
                    items={items}
                    open={buttonState === ButtonStateEnum.opened}
                    onClick={this.handlePopupItemClick}
                    onMouseEnter={this.handlePopupMouseEnter}
                    onMouseLeave={this.handlePopupMouseLeave}
                />
            </>
        );
    }
}

Button.propTypes = {
    items: PropTypes.array.isRequired
};

export default Button;