import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { getMachineById } from '../actions/machines.actions';
import { WEBSOCKET_URL } from '../constants';
import './Health.scss';

class Health extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			containerWidth: 1,
			health: null
		};
	}

	componentDidMount () {
		const { id, machines } = this.props;
		if (machines.size === 0) {
			this.props.getMachineById(id);
		}
		this.setState({
			containerWidth: this.healthContainer.clientWidth
		});

		this.websocket = new WebSocket(WEBSOCKET_URL);
		this.websocket.onopen = () => {
			console.log('ws open');
		};
		this.websocket.onerror = (e) => {
			console.log('ws error');
			console.log(e);
		};
		this.websocket.onmessage = (m) => {
			// console.log('message');
			// console.log(m);
			const { id, health } = JSON.parse(m.data);
			this.handleHealthUpdate(id, health);
		};
	}

	handleHealthUpdate = (id, health) => {
		if (id === this.props.id) {
			this.setState({ health });
		}
	}

	componentWillUnmount () {
		if (this.websocket && this.websocket.readyState === 1) {
			this.websocket.close();
		}
	}

	getMachineHealth = () => {
		let { health } = this.state;
		if (health) {
			return health;
		}
		const { id, machines, machine } = this.props;
		if (machines.size === 0) {
			health = machine.health;
		} else {
			const machineIndex = machines.findIndex(machine => machine.id === id);
			health = machines.getIn([machineIndex, 'health']);
		}
		return health || 1;
	}

	render () {
		const { showTitle } = this.props;
		const { containerWidth } = this.state;
		const health = this.getMachineHealth();

		return (
			<div className={showTitle ? 'health-component with-bg' : 'health-component'}>
				{ showTitle && (<h1>{health}</h1>) }
				<div className="health-container" ref={el => (this.healthContainer = el)}>
					<div style={{ width: Math.round(health*containerWidth/100) }} className={health > 70 ? 'healthy' : health > 50 ? 'mid-range' : 'low-health'}>&nbsp;</div>
				</div>
			</div>
		);
	}
}

Health.propTypes = {
	id: PropTypes.string.isRequired,
	showTitle: PropTypes.bool,
	machines: PropTypes.object.isRequired,
	getMachineById: PropTypes.func.isRequired,
	machine: PropTypes.object
};

const mapStateToProps = state => ({
	machines: state.machines.list,
	machine: state.machines.selectedMachine
});
export default connect(mapStateToProps, { getMachineById })(Health);
