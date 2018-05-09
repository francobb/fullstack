import { FETCH_USER } from '../actions/types';

/*
Determines whether or not user is logged in
 */

export default function (state = null, action) {
	console.log(`Action:${action}`);
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}
