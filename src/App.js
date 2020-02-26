import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';

import Machines from './components/Machines';
import MachineDetails from './components/MachineDetails';
import './App.scss';

function App ({ store }) {
	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					<header className='App-header'>
						<img alt='logo' height='272' width='800' src='https://i.imgur.com/jcvsFKh.png' />
					</header>

					<nav className='App-nav'>
						<Link to='/'>Home</Link>
						<Link to='/machines'>Machines</Link>
					</nav>

					<Switch>
						<Route exact path='/machines'>
							<Machines />
						</Route>
						<Route path='/machines/:id'>
							<MachineDetails />
						</Route>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}
App.propTypes = {
	store: PropTypes.object.isRequired
};

export default App;
