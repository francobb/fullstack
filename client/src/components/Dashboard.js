import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Dashboard = () => {
	return (
		<div>
			DashBoard
			<div className={'fixed-action-btn'}>
				<Link to={'/surveys/new'} className={'btn-floating btn-large red'}>
					<i className={'material-icons'}>add</i>
				</Link>
			</div>
		</div>
	);
};

export default connect(null, actions)(Dashboard);
