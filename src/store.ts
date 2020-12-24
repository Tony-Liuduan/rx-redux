import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import reducers from '@reducers/index';
import rootEpic from '@epics/index';

const epicMiddleware = createEpicMiddleware()
export function createReduxStore() {
    const store = createStore(
        reducers,
        applyMiddleware(epicMiddleware, thunkMiddleware)
    );

    epicMiddleware.run(rootEpic);
    return store
}