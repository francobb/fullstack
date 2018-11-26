import _ from "lodash";
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchVendors } from '../../actions';
import Vendor from './Vendor';
import '../../styles/styles.css';

class VendorList extends Component {
	
	componentDidMount() {
		this.props.fetchVendors();
	}
	
	render() {
		return _.map(this.props.vendors, ({name, strains}) => {
			return(
				<ul className={"vendor_wrapper"} key={name}>
					<li>
						<h1>
							{name}
							</h1>
						<Vendor strains={strains} name={name}/>
					</li>
				</ul>)
		});
	}
	
}

function mapStateToProps({vendors}) {
	return { vendors };
}

export default connect(mapStateToProps, { fetchVendors })(VendorList);
