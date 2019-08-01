import { combineReducers } from 'redux';
import products from './products';
import navState from './navState';


const myReducer = combineReducers({
    products,
    navState
});

export default myReducer;