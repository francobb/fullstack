import React from 'react';
import '../../styles/styles.css';

const Vendor = ({
  name,
  strains
}) => {
	return (
		<ul className={'horizontal_scroll_wrapper'}>{renderStrains(strains)}</ul>
	);
};

const renderStrains = (strains) => {
	return Object.keys(strains).map((keyName, keyIndex) => {
		return(
			<li className={'card horizontal_scroll_item'} key={strains[keyIndex].name}>
				<div className={'card-image'}>
					<img src={'https://slatercenter.com/wp-content/uploads/2018/03/TopShelfGratefulBreath.jpg'} />
				</div>
				<div className={'card-content'}>
					<span className={'card-title'}>{strains[keyIndex].name}</span>
				</div>
			</li>
		);
	});
};

export default Vendor;
