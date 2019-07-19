import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductItem extends Component {
    onDelete = (id) => () => {
        if(confirm("Do you want to delete it?")){ //eslint-disable-line
            this.props.onDeleteItem(id);
        }
    }
    render() {
        var { product, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    {/* className={`label label-${danger}`} */}
                    {product.status === true ?
                        <span className="label label-info">Available</span> :
                        <span className="label label-danger">Out Of Stock</span>
                    }
                </td>
                <td>
                    <Link to={`/product/edit/${product.id}`} className="btn btn-default margin-right">Edit</Link>
                    <button type="button" className="btn btn-danger" onClick={this.onDelete(product.id)}>Delete</button>
                </td>
            </tr>
        );
    }
}

export default ProductItem;