import { SET_MACHINES_LOADING, GET_MACHINES, GET_MACHINE_DETAILS } from '../actions/types';
import { List } from 'immutable';

// eslint-disable-next-line
const list = List();

const initialState = {
	loading: false,
	list,
	selectedMachine: {}
};

export default function machines (state = initialState, action) {
	switch (action.type) {
		case SET_MACHINES_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_MACHINES:
			return {
				...state,
				list: state.list.push(...action.payload),
				loading: false
			};
		case GET_MACHINE_DETAILS:
			return {
				...state,
				selectedMachine: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
