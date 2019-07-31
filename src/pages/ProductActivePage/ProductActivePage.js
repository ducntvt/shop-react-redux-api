import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actAddProductRequest, actUpdateProductRequest, actGetProductRequest } from './../../actions/index';
import { Form, Input, Button, Row, Col, Typography, Checkbox, InputNumber } from 'antd';
const { Title } = Typography;




class ProductActivePage extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {
    //         id: '',
    //         txtName: '',
    //         txtPrice: '',
    //         chkbStatus: false
    //     }
    // }



    // componentWillReceiveProps(nextProps) {
    //     console.log('nextProps :', nextProps);
    //     if (nextProps && nextProps.itemEditing) {
    //         var { itemEditing } = nextProps;
    //         this.setState({
    //             id: itemEditing.id,
    //             txtName: itemEditing.name,
    //             txtPrice: itemEditing.price,
    //             chkbStatus: itemEditing.status
    //         })
    //     }
    // }

    componentDidMount() {
        console.log('componentDidMount :');
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.editProduct(id);
        }
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate :');
        console.log('prevProps :', prevProps);
        console.log('form :', this.props);
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        console.log('value :', value);
        this.setState({
            [ name ]: value
        })
    }

    onSave = (e) => {
        e.preventDefault();
        var { id, txtName, txtPrice, chkbStatus } = this.state;
        var { history } = this.props;
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }
        if (id) {
            this.props.updateProduct(product);
            history.goBack();
        } else {
            this.props.addProduct(product);
            history.goBack();
        }
    }

    state = {
        confirmDirty: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    validateToPrice = (rule, value, callback) => {
        var reg = /^\d+$/;
        if (reg.test(value) && value <= 0) {
            callback('Product price is must number and greater than zero!');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
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
                        <Title>Add Product</Title>
                        <Form layout="horizontal" onSubmit={ this.handleSubmit } { ...formItemLayout } >
                            <Form.Item label="Product Name">
                                { getFieldDecorator('txtName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input product name!',
                                        },
                                    ],
                                })(<Input />) }
                            </Form.Item>
                            <Form.Item label="Product Price">
                                { getFieldDecorator('txtPrice', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input product price!'
                                        },
                                        {
                                            validator: this.validateToPrice,
                                        }
                                    ],
                                })(<InputNumber />) }
                            </Form.Item>
                            <Form.Item label="Status">
                                { getFieldDecorator('chkbStatus', {
                                    valuePropName: 'checked',
                                })(
                                    <Checkbox></Checkbox>,
                                ) }
                            </Form.Item>
                            <Form.Item { ...tailFormItemLayout }>
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}


const WrappedProductActivePage = Form.create()(ProductActivePage);

const mapStateToProps = (state) => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addProduct: (product) => {
            dispatch(actAddProductRequest(product));
        },
        updateProduct: (product) => {
            dispatch(actUpdateProductRequest(product));
        },
        editProduct: (id) => {
            dispatch(actGetProductRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedProductActivePage);