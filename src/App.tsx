import React from 'react';
import './Font.css'
import {Homepage} from './components/Homepage/Homepage'
import {Navigation} from './components/Navigation/Navigation'
import {Profile} from "./components/Profile/Profile";
import {Footer} from './components/Footer/Footer'
import './App.css'


export const App = () => {
    return (
        <div>
            <div className='app-wrapper'>
                <Navigation/>
                <Profile/>
                <Homepage/>
                <Footer/>
            </div>
        </div>
    )
}

