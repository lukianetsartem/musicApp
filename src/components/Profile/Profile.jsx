import React from 'react';
import classes from "./Profile.module.css";

export const Profile = () => {
    return (
        <div className={'Profile'}>
            <div className={classes.profileContent}>
                <div className={classes.userName}>Hello, USERNAME</div>
                <div className={classes.profileNav}>
                    <a href='#' className={classes.navItem}>Settings</a>
                    <a href='#' className={classes.navItem}>Subscriptions</a>
                    <a href='#' className={classes.navItem}>My profile</a>
                </div>
            </div>
        </div>
    )
}
