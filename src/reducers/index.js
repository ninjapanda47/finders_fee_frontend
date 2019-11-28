import { combineReducers } from 'redux';
import itemReducer from './itemReducer'
import userReducer from './userReducer'

export default combineReducers({
    items: itemReducer,
    user: userReducer
});