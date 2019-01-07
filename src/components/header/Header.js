import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <NavLink className='navLink' exact to='/'>
                    Home
                </NavLink>
                <NavLink className='navLink' to='/prints'>
                    Prints
                </NavLink>
            </header>
        )
    }
}