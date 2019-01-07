import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './../components/dashboard/Dashboard';
import Marketplace from './../components/marketplace/Marketplace';

export default class Router extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/prints' component={Marketplace} />
                    <Route path='/' component={Dashboard} />
                </Switch>
            </div>
        )
    }
}