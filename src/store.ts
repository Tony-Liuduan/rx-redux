import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
// import * as reducers from './store/reducers';
// import rootEpic from './store/epics';


const initValues = {}

const epicMiddleware = createEpicMiddleware()

export function createReduxStore() {
    const store = createStore(
        combineReducers({}),
        initValues,
        // applyMiddleware(epicMiddleware, thunkMiddleware)
    );

    // epicMiddleware.run(rootEpic)
    return store
}