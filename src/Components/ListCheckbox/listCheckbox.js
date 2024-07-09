import React from 'react';
import PropTypes from 'prop-types';
import styles from './listCheckbox.module.css';

export const ListCheckbox = ({ isToggled, onChange }) => {
    return (
        <input
            type="checkbox"
            className={styles.listCheckbox}
            checked={isToggled}
            onChange={onChange}
        />
    )
}

ListCheckbox.PropTypes = {
    isToggled: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
}

export default ListCheckbox;