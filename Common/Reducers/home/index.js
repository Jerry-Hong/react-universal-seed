import fetch from '../../Utilities/fetch.js';

const RECEIVE_TITLE = 'RECEIVE_TITLE';

export const fetchTitle = () => dispatch => fetch('/demo')
.then(res => dispatch({
	type: 'RECEIVE_TITLE',
	payload: res.jsonData
}))


export default function(state = '', action) {
	switch(action.type) {
	case RECEIVE_TITLE:
		return action.payload.title;
	default:
		return state;
	}
}