import React from 'react';
import PropTypes from 'prop-types';
import styles from './header.module.css';
import { Button } from '../Button/button';

export const Header = ({ logoSrc, projectName, onLogoClick, onLoginClick, onSigninClick, onLogoutClick, isAuthenticated }) => {
    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={onLogoClick}>
                <img src={logoSrc} alt="Logo" />
            </div>
            <div className={styles.projectName}>
                {projectName || 'Overview'}
            </div>
            
                {isAuthenticated ? (
                    <Button onClick={onLogoutClick}>Logout</Button>
                ) : (
                    <div className={styles.auth}>
                    <Button onClick={onLoginClick}>Log in</Button>
                    <Button onClick={onSigninClick} isMain={true}>Sign in</Button>
                    </div>
                )}
        </header>
    );
};

Header.propTypes = {
    logoSrc: PropTypes.string.isRequired,
    projectName: PropTypes.string,
    onLogoClick: PropTypes.func.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default Header;
