import React, { Component } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import routes from './routes';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Menu />
					<div className="container margin-top-10">
						<div className="row">
							{ this.showContentMenus(routes) }
						</div>
					</div>
				</div>
			</Router>
		);
	}

	showContentMenus = (routes) => {
		var result = null;
		result = routes.map((route, index) => {
			return (
				<Route
					key={ index }
					path={ route.path }
					exact={ route.exact }
					component={ route.main }
				/>)
		});
		return <Switch>{ result }</Switch>;
	}
}

export default App;