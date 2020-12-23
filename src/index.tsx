import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { createReduxStore } from './store';
import { App } from '@containers/App';
import 'antd/dist/antd.css';

const store = createReduxStore();
ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <BrowserRouter basename='/'>
                <Switch>
                    <Route component={App} />
                </Switch>
            </BrowserRouter>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root'),
);
