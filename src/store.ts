import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import * as reducers from './store/reducers';
import rootEpic from './store/epics';


const initValues = {
    count: 0
}

const epicMiddleware = createEpicMiddleware()

export default function () {
    const store = createStore(
        combineReducers(reducers),
        initValues,
        applyMiddleware(epicMiddleware, thunkMiddleware)
    );

    epicMiddleware.run(rootEpic)
    return store
}