import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './../components/dashboard/Dashboard';
import Marketplace from './../components/marketplace/Marketplace';
import SinglePhoto from './../components/singlePhoto/SinglePhoto';
import Cart from './../components/cart/Cart';

export default class Router extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/photo/:id' component={SinglePhoto} />
                    <Route path='/cart/:id' component={Cart} />
                    <Route path='/prints' component={Marketplace} />
                    <Route path='/' component={Dashboard} />
                </Switch>
            </div>
        )
    }
}