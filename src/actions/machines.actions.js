import axios from 'axios';
import { SET_MACHINES_LOADING, GET_MACHINES, GET_MACHINE_DETAILS } from './types';

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

export const getMachineById = (id) => dispatch => {
	dispatch(setMachinesLoading());
	axios
		.get(`${baseUrl}/machines/${id}`)
		.then(res=> dispatch({
			type: GET_MACHINE_DETAILS,
			payload: res.data
		}));
};
