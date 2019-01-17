import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router'
import './Header.css';

class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            user: [],
            adminCheck: false
        }
    }

    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            if (res.data.email === process.env.REACT_APP_ADMIN) {
                this.setState({
                    adminCheck: true
                })
            }
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
                user: null,
                adminCheck: false
            })
        })
    }

    render() {
        console.log(this.state.adminCheck)
        return (
            <header>
                <div className='flexbone'>
                    <div className='navBox'>
                        <div className='logo'></div>
                        <NavLink className='navLink' exact to='/'>
                            Home
                        </NavLink>
                        <NavLink className='navLink' to={this.state.user ? `/cart/${this.state.user.id}` : '/prints'}>
                            Cart
                        </NavLink>
                        {this.state.adminCheck ? <NavLink className='navLink' to='/admin'>
                            Admin
                        </NavLink> : null}
                    </div>
                    <div className='userContainer'>
                        {this.state.user ? <h4>{this.state.user.name}</h4> : <button className='headerButton' onClick={this.login}>Log In</button>}
                        <NavLink to='/'>
                            {this.state.user ? <button className='headerButton' onClick={this.logout}>Logout</button> : null}
                        </NavLink>
                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(Header)