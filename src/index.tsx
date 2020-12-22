import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { App } from './containers/App/App';

ReactDOM.render(
    <BrowserRouter basename="/basename">
        <Switch>
            <Route path="/home" component={App} />
            <Redirect to={{ pathname: "/home" }} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root"),
);