import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { getMachines } from '../actions/machines.actions';
import Health from './Health';
import './Machines.scss';

class Machines extends React.Component {

	componentDidMount () {
		this.props.getMachines();
	}

	render () {
		const { machines } = this.props;

		return (
			<div id="machines-component">
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>IP Address</th>
							<th>Health</th>
						</tr>
					</thead>
					<tbody>
						{
							machines.map((machine, key) => (<tr key={key}>
								<td className="machine-tdata">{machine.name}</td>
								<td className="machine-tdata">{machine.ip_address}</td>
								<td width="40%" className="machine-tdata"><Health showTitle={false} health={machine.health} /></td>
							</tr>)
							)}
					</tbody>
				</table>
			</div>
		);
	}
}
Machines.propTypes = {
	getMachines: PropTypes.func.isRequired,
	machines: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	machines: state.machines.data
});
export default connect(mapStateToProps, { getMachines })(Machines);
