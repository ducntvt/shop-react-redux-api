import { combineReducers } from 'redux';
import products from './products';
import itemEditing from './itemEditing';


const myReducer = combineReducers({
    products,
    itemEditing
});

export default myReducer;