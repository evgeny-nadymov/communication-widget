import React from 'react';
import PropTypes from 'prop-types';
import { getIconByType } from './Utils/Icons';
import './Item.css';

class Item extends React.Component {
    render() {
        const { info, onClick } = this.props;
        if (!info) return null;

        return (
            <div className='widget-item' title={info.name} onClick={e => onClick(e, info)}>
                {getIconByType(info['@type'])}
            </div>
        );
    }
}

Item.propTypes = {
    info: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Item;