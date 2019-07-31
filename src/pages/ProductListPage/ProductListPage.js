import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { actFetchProductRequest, actDeleteProductRequest } from './../../actions/index';
import 'antd/dist/antd.css';
import { Table, Popconfirm, Button, Icon, Row, Col } from 'antd';

class ProductListPage extends Component {
    constructor () {
        super();
        this.columns = [
            { title: 'No.', dataIndex: 'index', key: 'no' },
            { title: 'Code', dataIndex: 'id', key: 'code' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    status === true ?
                        <span className="label label-info">Available</span> :
                        <span className="label label-danger">Out Of Stock</span>

                ),
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => (
                    <div>
                        <Button type="primary" className="margin-right-10">
                            <Link to={ `/product/edit/${record.id}` }>Edit</Link>
                        </Button>

                        <Popconfirm title="Sure to delete?" onConfirm={ () => this.onDeleteItem(record.id) }>
                            <Button type="danger">Delete</Button>
                        </Popconfirm>
                    </div>
                )
            }
        ];
    }

    componentDidMount() {
        this.props.fetchAllProduct();
    }

    onDeleteItem = (id) => {
        this.props.deleteProduct(id);
    }

    render() {
        var { products } = this.props;
        var dataSource = this.dataSource(products);
        return (
            <Row>
                <Col span={ 24 }>
                    <Button type="primary"><Link to='/product/add'><Icon type="file-add" /> Add Product</Link></Button>
                    <Table className="margin-top-10" dataSource={ dataSource } columns={ this.columns } bordered />
                </Col>
            </Row>
        );
    }

    dataSource = (products) => {
        var dataSource = [];
        if (products.length > 0) {
            dataSource = products.map((product, index) => {
                return {
                    key: index,
                    index: index + 1,
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    status: product.status,
                }
            });
        }
        return dataSource
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