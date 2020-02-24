import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import { getMachines } from '../actions/machines.actions';
import Health from './Health';
import './Machines.scss';

class Machines extends React.Component {

	componentDidMount () {
		this.props.getMachines();
	}

	render () {
		const { list } = this.props;

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
							list.map((machine, key) => (<tr key={key}>
								<td className="machine-tdata"><Link to={`/machines/${machine.id}`}>{machine.name}</Link></td>
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
	list: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	list: state.machines.list
});
export default connect(mapStateToProps, { getMachines })(Machines);
