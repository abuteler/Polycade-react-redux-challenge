import axios from 'axios';
import { GET_MACHINES, SET_MACHINES_LOADING } from './types';

const baseUrl = 'http://localhost:8080';

const setMachinesLoading = () => ({
	type: SET_MACHINES_LOADING
});

export const getMachines = () => dispatch => {
	dispatch(setMachinesLoading());
	axios
		.get(`${baseUrl}/machines`)
		.then(res=> dispatch({
			type: GET_MACHINES,
			payload: res.data
		}));
};
