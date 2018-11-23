import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS, FETCH_VENDORS} from './types';

/*
	Actions are payloads of information that send data from
	your application to your store
 */
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token);

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);
	
	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');
	
	dispatch({ type: FETCH_SURVEYS, payload: res.data.surveys });
};

export const fetchVendors = () => async dispatch => {
	const res = await axios.get('/api/vendors');
	console.log(res.data);
	dispatch({type: FETCH_VENDORS, payload: res.data })
};
