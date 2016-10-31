import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../Reducers/';
import thunk from 'redux-thunk'


export default function(initialState) {
	return createStore(reducers, initialState, compose(
		applyMiddleware(thunk),
		typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ));
}