import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchVendors } from '../../actions';

class VendorList extends Component {
	
	componentDidMount() {
		this.props.fetchVendors();
	}
	
	// TODO: create the list that compiles the different vendors offerings
	
	renderVendors() {
		return this.props.vendors.reverse().map(vendor => {
			return(
				<div>
					{vendor.name}
				</div>
			);
		});
	}
	
	render() {
		return (
			<div>
				{this.renderVendors()}
			</div>
		);
	}
	
}

function mapStateToProps({vendors}) {
	return { vendors };
}

export default connect(mapStateToProps, { fetchVendors })(VendorList);
