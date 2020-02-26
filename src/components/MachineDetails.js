import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { getMachineById, updateMachineById } from '../actions/machines.actions';

import Health from './Health';
import './MachineDetails.scss';

class MachineDetails extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			id: window.location.pathname.substr(10),
			newName: ''
		};
	}

	componentDidMount () {
		const { id } = this.state;
		this.props.getMachineById(id);
	}

	handleChange = (e) => {
		this.setState({ newName: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { id, newName } = this.state;
		if (newName !== '') {
			this.props.updateMachineById(id, newName);
			this.setState({ newName: '' });
		}
	};

	render () {
		const { machine } = this.props;
		const { id, newName } = this.state;

		return (
			<div className="machine-details-component">
				<div className="left-col">
					<h2>{machine.name}</h2>
					<h3>Update Device</h3>
					<form className="machine-update-form" onSubmit={this.handleSubmit}>
						<label htmlFor="name">Name:</label>
						<input type="text" name="name" placeholder={machine.name} value={newName} onChange={this.handleChange} />
						<div className="submit-container">
							<input type="submit" name="submit" />
						</div>
					</form>
				</div>
				<div className="right-col">
					<Health showTitle={true} id={id} machine={machine} />
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
	updateMachineById: PropTypes.func.isRequired,
	machine: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	machine: state.machines.selectedMachine
});

export default connect(mapStateToProps, { getMachineById, updateMachineById })(MachineDetails);
