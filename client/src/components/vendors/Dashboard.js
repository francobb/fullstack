import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import VendorList from './VendorList';

const Dashboard = () => {
	return (
		<div>
			<VendorList />
		</div>
	);
};

export default connect(null, actions)(Dashboard);
