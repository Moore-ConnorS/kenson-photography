import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Marketplace from './../components/marketplace/Marketplace';
import SinglePhoto from './../components/singlePhoto/SinglePhoto';
import Cart from './../components/cart/Cart';
import Admin from './../components/admin/Admin';

export default class Router extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/photo/:id' component={SinglePhoto} />
                    <Route path='/cart/:id' component={Cart} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/' component={Marketplace} />
                </Switch>
            </div>
        )
    }
}