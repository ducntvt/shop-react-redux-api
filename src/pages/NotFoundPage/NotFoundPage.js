import React, { Component } from "react";
import { connect } from 'react-redux';
import { actUpdateNavState } from './../../actions/index';
import { Result, Button } from 'antd';
import { Link } from "react-router-dom";

class NotFoundPage extends Component {
    handleClick = () => {
        this.props.updateNavState("home");
    }
    render() {
        return (
            <Result
                title="404 - Not Found!"
                status="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={ <Button type="primary"><Link to='/' innerRef={ this.handleClick } >Back Home</Link></Button> }

            />

        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}

const mapsDispatchToProps = (dispatch, props) => {
    return {
        updateNavState: (navState) => {
            dispatch(actUpdateNavState(navState));
        },
    }
}
export default connect(mapStateToProps, mapsDispatchToProps)(NotFoundPage);