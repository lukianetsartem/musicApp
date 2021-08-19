import React from 'react';
import classes from './Navigation.module.css'


export const Navigation = () => {
    return (
        <div className={'Nav'}>
            <div className={classes.navContent}>
                <div className={classes.logo}><img className={classes.logoItem} src="https://assets.materialup.com/uploads/5495d88e-7a3f-46fd-a93c-26403b6e4cc5/UjXSVmq_uzjAKg7P8C18AniBoWQCmbVm52DQVd9n_3Cb4PNaflSpiS7nWHtP-ImfJlMe=w300"></img></div>
                <div className={classes.items}>
                    <a className={classes.navItem} href="#">Home</a>
                    <a className={classes.navItem}  href="#">My music</a>
                    <a className={classes.navItem} href="#">Search</a>
                </div>
            </div>
        </div>
    )
}

