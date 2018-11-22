import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

// TODO: add vendorlist component that lists the 3 vendors options
const Dashboard = () => {
	return (
		<div>
			{"This is the other dashboard"}
		</div>
	);
};

export default connect(null, )(Dashboard);
