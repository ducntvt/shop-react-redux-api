import * as Types from './../constants/ActionTypes';
import CallAPI from "./../utils/ApiCaller";

export const actUpdateNavState = (navState) => {
    return {
        type: Types.UPDATE_NAV_STATE,
        navState
    }
}

export const actFetchProductRequest = () => {
    return (dispatch) => {
        return CallAPI('products', 'GET', null).then((res) => {
            dispatch(actFetchProduct(res.data));
        })
    }
}

export const actFetchProduct = (products) => {
    return {
        type: Types.FETCH_PRODUCT,
        products
    }
}

export const actDeleteProductRequest = (id) => {
    return dispatch => {
        return CallAPI(`products/${id}`, 'DELETE', null).then((res) => {
            if (res.status === 200) {
                dispatch(actDeleteProduct(id));
            }
        })
    }
}

export const actDeleteProduct = (id) => {
    return {
        type: Types.DELETE_PRODUCT,
        id
    }
}

export const actAddProductRequest = (product) => {
    return dispatch => {
        return CallAPI('products', 'POST', product).then((res) => {
            if (res.status === 201) {
                dispatch(actAddProduct(res.data));
            }
        })
    }
}

export const actAddProduct = (product) => {
    return {
        type: Types.ADD_PRODUCT,
        product
    }
}

export const actUpdateProductRequest = (product) => {
    return dispatch => {
        return CallAPI(`products/${product.id}`, 'PUT', product).then((res) => {
            if (res.status === 200) {
                dispatch(actUpdateProduct(product));
            }
        })
    }
}

export const actUpdateProduct = (product) => {
    return {
        type: Types.UPDATE_PRODUCT,
        product
    }
}

export const actGetProductRequest = (id) => {
    return dispatch => {
        return CallAPI(`products/${id}`, 'GET', null).then((res) => {
            if (res.status === 200) {
                dispatch(actGetProduct(res.data));
            }
        })
    }
}

export const actGetProduct = (product) => {
    return {
        type: Types.EDIT_PRODUCT,
        product
    }
}