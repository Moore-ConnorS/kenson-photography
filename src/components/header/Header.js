import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router'
import './Header.css';

class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            this.setState({
                user: res.data
            })
        })
    }

    login() {
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback')
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }

    logout = () => {
        axios.post('/api/logout').then(() => {
            this.setState({
                user: null
            })
        })
    }


    render() {
        return (
            <header>
                <NavLink className='navLink' exact to='/'>
                    Home
                </NavLink>
                <NavLink className='navLink' to='/prints'>
                    Prints
                </NavLink>
                <NavLink className='navLink' to={this.state.user ? `/cart/${this.state.user.id}` : '/'}>
                    Cart
                </NavLink>
                <button onClick={this.login}>Log In</button>
                <button onClick={this.logout}>Logout</button>
            </header>
        )
    }
}

export default withRouter(Header)