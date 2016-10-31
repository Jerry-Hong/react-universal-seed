import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../Pages/App.js';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound';

export default function(store) {
	return (
		<Route path="/" component={ App }>
			<IndexRoute component={ Home } onEnter={ Home.onEnter(store) }></IndexRoute>
			<Route path="*" component={ NotFound } status={404}></Route>
		</Route>
	)
}
