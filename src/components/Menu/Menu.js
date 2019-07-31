import React, { Component } from "react";
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actUpdateNavState } from "./../../actions/index";

import { Menu, Icon } from 'antd';

const menu = [
    {
        name: 'Home',
        to: '/',
        exact: true,
        key: 'home',
        icon: 'setting'
    },
    {
        name: 'Products',
        to: '/product-list',
        exact: false,
        key: 'products',
        icon: 'appstore'
    },

]

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={ to }
            exact={ activeOnlyWhenExact }
            children={ ({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className={ active }>
                        <Link to={ to }>
                            { label }
                        </Link>
                    </li>
                );
            } }
        />
    );
}

const MenuLinkAntd = ({ label, to, activeOnlyWhenExact, icon }) => {
    return (
        <Route
            path={ to }
            exact={ activeOnlyWhenExact }
            children={ ({ match }) => {
                return (
                    <Link to={ to }>
                        <Icon type={ icon } />
                        { label }
                    </Link>
                );
            } }
        />
    );
}

class MenuRoot extends Component {
    handleClick = e => {
        this.props.updateNavState(e.key)
    };

    render() {
        return (
            // <div className="navbar">
            //     <ul className="nav navbar-nav">
            //         { this.showMenu(menu) }
            //     </ul>
            // </div>

            <Menu onClick={ this.handleClick } selectedKeys={ [ this.props.navState ] } mode="horizontal">
                { this.showMenuAntd(menu) }
            </Menu>
        );
    }

    showMenu = (menu) => {
        var result = null;
        result = menu.map((item, index) => {
            return (
                <MenuLink
                    key={ index }
                    label={ item.name }
                    to={ item.to }
                    activeOnlyWhenExact={ item.exact }
                />
            );
        })
        return result;
    }

    showMenuAntd = (menu) => {
        var result = null;
        result = menu.map((item, index) => {
            return (
                <Menu.Item key={ item.key }>
                    <MenuLinkAntd
                        label={ item.name }
                        to={ item.to }
                        activeOnlyWhenExact={ item.exact }
                        icon= {item.icon}
                    >          
                    </MenuLinkAntd>
                </Menu.Item>
            );
        })
        return result;
    }
}

const mapStateToProps = state => {
    return {
        navState: state.navState
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateNavState: (state) => { dispatch(actUpdateNavState(state)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuRoot);