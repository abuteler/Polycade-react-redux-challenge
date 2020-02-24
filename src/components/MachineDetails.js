import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { getMachineById } from '../actions/machines.actions';

import Health from './Health';
import './MachineDetails.scss';

const id = window.location.pathname.substr(10);

class MachineDetails extends React.Component {

	componentDidMount () {
		console.log(id);
		this.props.getMachineById(id);
	}

	render () {
		const { machine } = this.props;
		console.log(id, machine, this.props);
		return (
			<div className="machine-details-component">
				<div className="left-col">
					<h2>{machine.name}</h2>
					<h3>Update Device</h3>
					<div className="machine-update-form">
						<label htmlFor="machine-name">Name:</label>
						<input type="text" name="machine-name" placeholder={machine.name} />
						<div className="submit-container">
							<input type="submit" name="submit" />
						</div>
					</div>
				</div>
				<div className="right-col">
					<Health showTitle={true} health={machine.health || 1} />
					<h3>Stats</h3>
					<div>
						IP Address: {machine.ip_address}
					</div>
				</div>
			</div>
		);
	}
}

MachineDetails.propTypes = {
	getMachineById: PropTypes.func.isRequired,
	machine: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	machine: state.machines.selectedMachine
});

export default connect(mapStateToProps, { getMachineById })(MachineDetails);
