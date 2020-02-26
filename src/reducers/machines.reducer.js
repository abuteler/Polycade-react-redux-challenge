import { SET_MACHINES_LOADING, GET_MACHINES, GET_MACHINE_DETAILS, UPDATE_MACHINE_DETAILS } from '../actions/types';
import { List } from 'immutable';

// eslint-disable-next-line
const list = List();

export const initialState = {
	loading: false,
	list: list,
	selectedMachine: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_MACHINES_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_MACHINES:
			return {
				...state,
				list: list.push(...action.payload),
				loading: false
			};
		case GET_MACHINE_DETAILS:
			return {
				...state,
				selectedMachine: action.payload,
				loading: false
			};
		case UPDATE_MACHINE_DETAILS:
			return {
				...state,
				selectedMachine: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
