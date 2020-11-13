import React, { useState } from 'react';
import { changeChecked } from '../../lib/api/admin';

const CheckBox = ({ uid, verified, isStaff, isBan }) => {
	const [staff, setStaff] = useState(isStaff)
	const [ban, setBan] = useState(isBan)
	const checkSwitch = (action) => {
		changeChecked( action, uid)
      .then((response) => {
				action === 'staff' ? setStaff(!staff) : setBan(!ban)
        
      })
      .catch((error) => {
        // console.error(error.response);
        // console.error(error.request);
        // console.error(error.message);
      });
	}
	return (
		<>
			<input
				readOnly
				type={"checkbox"}
				checked={verified}
			>
			</input>
			<input
				type={"checkbox"}
				checked={staff}
				onChange={() => checkSwitch('staff') }
			>
			</input>
			<input
				type={"checkbox"}
				checked={isBan}
				onChange={() =>checkSwitch('ban')}
			>
			</input>
		</>
	);
};

export default CheckBox;