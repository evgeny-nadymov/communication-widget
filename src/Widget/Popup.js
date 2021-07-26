import React from 'react';
import PropTypes from 'prop-types';
import PopupItem from './PopupItem';
import './Popup.css';

class Popup extends React.Component {
    render() {
        const { open, items, onClick, onMouseEnter, onMouseLeave } = this.props;

        return (
            <div
                className={'widget-popup' + (open ? ' widget-popup-open' : '')}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {items.map((x, i) => <PopupItem key={x.id} id={open ? items.length - i : i } info={x} onClick={onClick}/>)}
            </div>
        );
    }
}

Popup.propTypes = {
    open: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Popup;