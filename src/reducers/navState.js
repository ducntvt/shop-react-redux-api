import * as Types from './../constants/ActionTypes';
let navStateItem = sessionStorage.getItem('navState');
var defaultState = navStateItem ? navStateItem : 'home';

var navState = (state = defaultState, action) => {
    switch (action.type) {
        case Types.UPDATE_NAV_STATE:
            state = action.navState;
            sessionStorage.setItem('navState', action.navState);
            return state;
        default:
            return state;
    }
}

export default navState;