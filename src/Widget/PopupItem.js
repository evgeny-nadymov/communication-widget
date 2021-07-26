import React from 'react';
import PropTypes from 'prop-types';
import { getIconByType } from './Utils/Icons';
import './PopupItem.css';

class PopupItem extends React.Component {
    render() {
        const { id, info, onClick } = this.props;
        if (!info) return null;

        const style = {
            transitionDelay: id * 30 + 'ms'
        }

        return (
            <div className='widget-popup-item' onClick={e => onClick(e, info)} style={style}>
                {getIconByType(info['@type'])}<p>{info.name}</p>
            </div>
        );
    }
}

PopupItem.propTypes = {
    info: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default PopupItem;