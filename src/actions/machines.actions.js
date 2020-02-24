import axios from 'axios';
import { SET_MACHINES_LOADING, GET_MACHINES, GET_MACHINE_DETAILS, UPDATE_MACHINE_DETAILS } from './types';

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

export const updateMachineById = (id, newName) => dispatch => {
	dispatch(setMachinesLoading());
	axios
		.put(`${baseUrl}/machines/${id}`, { name: newName })
		.then(res=> dispatch({
			type: UPDATE_MACHINE_DETAILS,
			payload: res.data
		}));
};
