import React from 'react';
import {Player} from "../Player/Player";
import classes from "./Homepage.module.css";


export const Homepage = () => {
    return (
        <div className={'Homepage'}>
            <div className={classes.player}>
                <Player/>
            </div>
        </div>
    )
}

