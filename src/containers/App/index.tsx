import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import ThunkDemo from '../ThunkDemo';
import ObservableDemo from '../ObservableDemo';

export class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <AppLayout>
            <Switch>
                <Route path='/thunk' component={ThunkDemo} />
                <Route path='/observable' component={ObservableDemo} />
                <Redirect to={{ pathname: '/thunk' }} />
            </Switch>
        </AppLayout>
    }
}
