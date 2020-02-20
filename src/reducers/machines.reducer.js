import { GET_MACHINES, SET_MACHINES_LOADING } from '../actions/types';


const initialState = {
	data: [],
	loading: false
};

export default function machines (state = initialState, action) {
	switch (action.type) {
		case GET_MACHINES:
			return {
				...state,
				data: action.payload,
				loading: false
			};
		case SET_MACHINES_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
