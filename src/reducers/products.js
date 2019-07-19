import * as Types from './../constants/ActionTypes';
var defaultState = [];

var products = (state = defaultState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.FETCH_PRODUCT:
            state = action.products;
            return [...state];
        case Types.DELETE_PRODUCT:
            index = state.findIndex(product => product.id === action.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
            return [...state];
        case Types.ADD_PRODUCT:
            state.push(action.product);
            return [...state];
        case Types.UPDATE_PRODUCT:
            index = state.findIndex(product => product.id === action.product.id);
            if (index !== -1) {
                state[index] = action.product;
            }
            return [...state]
        default:
            return state;
    }
}

export default products;