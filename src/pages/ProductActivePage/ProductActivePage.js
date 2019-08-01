import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { actAddProductRequest, actUpdateProductRequest, actGetProductDetailRequest } from './../../actions/index';
import { Form, Input, Button, Row, Col, Checkbox, InputNumber, Card } from 'antd';

class ProductActivePage extends Component {

    async componentDidMount() {
        const { match } = this.props;
        const id = match.params.id;
        if (id) {
            try {
                const response = await actGetProductDetailRequest(id);
                const {
                    form: { setFieldsValue }
                } = this.props;
                setFieldsValue({
                    txtName: response.data.name,
                    txtPrice: response.data.price,
                    chkbStatus: response.data.status
                });

            } catch (e) {
                console.log(e)
            }
        }
    }

    // state = {
    //     confirmDirty: false,
    // };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { match } = this.props;
                const id = match.params.id;
                const product = {
                    id: id,
                    name: values.txtName,
                    price: values.txtPrice,
                    status: values.chkbStatus
                }

                if (id) {
                    this.props.updateProduct(product);
                    this.props.history.push('/product-list');
                } else {
                    this.props.addProduct(product);
                    this.props.history.push('/product-list');
                }

            }
        });
    };

    // handleConfirmBlur = e => {
    //     const { value } = e.target;
    //     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    // };

    // validateToPrice = (rule, value, callback) => {
    //     var reg = /^\d+$/;
    //     if (reg.test(value) && value <= 0) {
    //         callback('Product price is must number and greater than zero!');
    //     } else {
    //         callback();
    //     }
    // };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { match } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
                <Row type="flex" justify="center">
                    <Col span={ 12 }>
                        <Card title={ !match.params.id ? "Add Product" : "Edit Product" }>
                            <Form layout="horizontal" onSubmit={ this.handleSubmit } { ...formItemLayout } >
                                <Form.Item label="Product Name" >
                                    { getFieldDecorator('txtName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input product name!',
                                            },
                                        ],
                                    })(<Input />) }
                                </Form.Item>
                                <Form.Item label="Product Price" >
                                    { getFieldDecorator('txtPrice', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input product price!'
                                            },
                                            // {
                                            //     validator: this.validateToPrice,
                                            // }
                                        ],
                                    })(<InputNumber min={ 1 } className="input-number-size" />) }
                                </Form.Item>
                                <Form.Item label="Status">
                                    { getFieldDecorator('chkbStatus', {
                                        valuePropName: 'checked',
                                    })(
                                        <Checkbox></Checkbox>,
                                    ) }
                                </Form.Item>
                                <Form.Item { ...tailFormItemLayout }>
                                    <Button type="danger" className="margin-right-10"><Link to="/product-list">Go Back</Link></Button>
                                    <Button type="primary" htmlType="submit">Save</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}


const WrappedProductActivePage = Form.create()(ProductActivePage);

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addProduct: (product) => {
            dispatch(actAddProductRequest(product));
        },
        updateProduct: (product) => {
            dispatch(actUpdateProductRequest(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedProductActivePage);