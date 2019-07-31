import { combineReducers } from 'redux';
import products from './products';
import itemEditing from './itemEditing';
import navState from './navState';


const myReducer = combineReducers({
    products,
    itemEditing,
    navState
});

export default myReducer;