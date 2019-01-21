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
            adminCheck: false,
            toggle: false
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

    toggler = () => {
        this.setState((prevState) => {
            return {
                toggle: !prevState.toggle
            }
        })
    }

    render() {
        console.log('toggler', this.state.toggle)
        return (
            <body>

                <header>
                    <div className='flexbone'>
                        <div className='navBox'>
                            <div className='logo'></div>
                            <NavLink className='link' exact to='/'>
                                <h1>Kenson Photography</h1>
                            </NavLink>
                            <div className='menu'>
                                <NavLink className='link' exact to='/'>
                                    <div className='navLink'>
                                        Home
                            </div>
                                </NavLink>
                                <NavLink className='link' to={this.state.user ? `/cart/${this.state.user.id}` : '/prints'}>
                                    <div className='navLink'>
                                        {this.state.user ? 'Cart' : <div style={{ fontSize: '16px', margin: '-7px' }}>Login to Shop</div>}
                                    </div>
                                </NavLink>
                                {this.state.adminCheck ? <NavLink className='link' to='/admin'>
                                    <div className='navLink'>
                                        Admin
                            </div>
                                </NavLink> : null}
                            </div>
                        </div>
                        <div className='userContainer'>
                            {this.state.user ? <h3>{this.state.user.name}</h3> : <button className='headerButton' onClick={this.login}>Log In</button>}
                            <NavLink to='/'>
                                {this.state.user ? <button className='headerButton' onClick={this.logout}>Logout</button> : null}
                            </NavLink>
                        </div>
                        {/* ----------------- Responsive Hamburger Menu ----------------------- */}
                        <div className='burgerMenu' onClick={this.toggler}></div>
                    </div>
                </header>
                <div>
                    <div className={this.state.toggle ? 'resMenu' : 'hide'}>
                        <div className='resUser'>

                            {this.state.user ? <h3>{this.state.user.name}</h3> : <button className='headerButton' onClick={this.login}>Log In</button>}
                            <NavLink to='/'>
                                {this.state.user ? <button className='headerButton' onClick={this.logout}>Logout</button> : null}
                            </NavLink>
                        </div>
                        <NavLink className='link' exact to='/'>
                            <div className='navLink'>
                                Home
                            </div>
                        </NavLink>
                        <NavLink className='link' to={this.state.user ? `/cart/${this.state.user.id}` : '/prints'}>
                            <div className='navLink'>
                                {this.state.user ? 'Cart' : <div style={{ fontSize: '16px', margin: '-7px' }}>Login to Shop</div>}
                            </div>
                        </NavLink>
                        {this.state.adminCheck ? <NavLink className='link' to='/admin'>
                            <div className='navLink'>
                                Admin
                            </div>
                        </NavLink> : null}
                    </div>
                </div>
            </body>
        )
    }
}

export default withRouter(Header)