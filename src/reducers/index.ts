import { combineReducers } from 'redux';
import thunk from './thunk';
import observable from './observable';

export default combineReducers({
    thunk,
    observable,
});
