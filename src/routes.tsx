import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { VehiclesMain } from './components/vehicles/pages/vehicles-main';
import { AppBar } from './components/app-bar';
import { Registration } from './components/registration';

export const Routes = () => {
    return (
        <HashRouter>
            <div>
                <AppBar />
                <Switch>
                    <Route path="/" exact={true} component={VehiclesMain} />
                    <Route path="/cadastro" exact={true} component={Registration} />
                </Switch>
            </div>
        </HashRouter>
    )
}