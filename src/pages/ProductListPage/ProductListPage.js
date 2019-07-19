import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';


import { actFetchProductRequest, actDeleteProductRequest } from './../../actions/index';

class ProductListPage extends Component {

    componentDidMount() {
        this.props.fetchAllProduct();
    }

    onDeleteItem = (id) => {
        this.props.deleteProduct(id);
    }

    render() {
        var { products } = this.props;
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Link to='/product/add' className="btn btn-primary margin-bottom">Add Product</Link>
                <ProductList>
                    {this.showProducts(products)}
                </ProductList>
            </div>
        );
    }

    showProducts = (products) => {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDeleteItem={this.onDeleteItem}
                    />
                )
            })
        }
        return result;
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapsDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProduct: () => {
            dispatch(actFetchProductRequest());
        },
        deleteProduct: (id) => {
            dispatch(actDeleteProductRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapsDispatchToProps)(ProductListPage);