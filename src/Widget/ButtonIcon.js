import React from 'react';
import PropTypes from 'prop-types';
import './ButtonIcon.css';

class ButtonIcon extends React.Component {
    render() {
        const { icon, openIcon, open } = this.props;

        return (
            <span className={ 'widget-button-icon' + (open ? ' widget-button-icon-open' : '') }>
                {icon}
                {openIcon}
            </span>
        );
    }
}

ButtonIcon.propTypes = {
    icon: PropTypes.element.isRequired,
    openIcon: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired
};

export default ButtonIcon;