import React from 'react';
import { PropTypes } from 'prop-types';

import './Health.scss';

class Health extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			containerWidth: 1
		};
	}

	componentDidMount () {
		this.setState({
			containerWidth: this.healthContainer.clientWidth
		});
	}

	render () {
		const {
			health,
			showTitle
		} = this.props;
		const { containerWidth } = this.state;

		return (
			<div className={showTitle ? 'health-component with-bg' : 'health-component'}>
				{ showTitle && (<h1>{health}</h1>) }
				<div className="health-container" ref={el => (this.healthContainer = el)}>
					<div style={{ width: Math.round(health*containerWidth/100) }} className="current-health">&nbsp;</div>
				</div>
			</div>
		);
	}
}

Health.propTypes = {
	health: PropTypes.number.isRequired,
	showTitle: PropTypes.bool
};

export default Health;
