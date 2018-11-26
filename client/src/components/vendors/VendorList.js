import _ from "lodash";
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchVendors } from '../../actions';
import Vendor from './Vendor';

class VendorList extends Component {
	
	componentDidMount() {
		this.props.fetchVendors();
	}
	
	render() {
		return _.map(this.props.vendors, ({name, strains}) => {
			return(
				<div>
					<h1 key={name}>
						{name}
					</h1>
					<Vendor strains={strains} name={name}/>
				</div>
			);
		});
	}
	
}

function mapStateToProps({vendors}) {
	return { vendors };
}

export default connect(mapStateToProps, { fetchVendors })(VendorList);
