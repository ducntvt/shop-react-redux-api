import * as Types from './../constants/ActionTypes';
var defaultState = {};

var itemEditing = (state = defaultState, action) => {
    switch (action.type) {
        case Types.EDIT_PRODUCT:
            state = action.product;
            return state;
        default:
            return state;
    }
}

export default itemEditing;