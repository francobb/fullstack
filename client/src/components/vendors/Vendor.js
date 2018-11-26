import React from 'react';

const Vendor = ({
  name,
  strains
}) => {
	return (
		<div>{renderStrains(strains)}</div>
	);
};

const renderStrains = (strains) => {
	return Object.keys(strains).map((keyName, keyIndex) => {
		return(
			<div key={strains[keyIndex].name}>
				{strains[keyIndex].name}
			</div>
		);
	});
};

export default Vendor;
