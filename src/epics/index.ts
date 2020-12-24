import { combineEpics } from 'redux-observable'
import observableEpic from './observable';

export default combineEpics(observableEpic);