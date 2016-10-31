import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import WithStylesContext from '../Common/utilities/WithStylesContext.js';
import createStore from '../Common/Store/'
import createRoutes from '../Common/Router';

const store = createStore(window.storeState);
const routes = createRoutes(store);

ReactDOM.render(
<Provider store={ store }>
	<WithStylesContext onInsertCss={ styles => { 
        if(process.env.NODE_ENV !== 'production')
            styles._insertCss(); 
    }}>
        <Router history={ browserHistory }>
            { routes }
        </Router>
    </WithStylesContext>
</Provider>, document.getElementById('root'))
