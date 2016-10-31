import React from 'react';
import createStore from '../../Common/Store/';
import createRoute from '../../Common/Router/'
import Html from './html.js';
import ReactDOMServer from 'react-dom/server';
import WithStylesContext from '../../Common/Utilities/WithStylesContext.js';
import { Router, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

export default function(ctx, next) {
	const store = createStore();
    const childRoutes = createRoute(store);
    return new Promise((resolve, reject) => {
        match({ routes: childRoutes, location: ctx.request.url }, (error, redirectLocation, renderProps) => {
            if (error) {
                console.log(error)
                resolve();
                return next();
            } else if (redirectLocation) {
                ctx.redirect(redirectLocation.pathname + redirectLocation.search);
                return resolve();
            } else if (renderProps) {
                const reduxState = JSON.stringify(store.getState());
                const css = new Set();
                const component = (
                    <Provider store={ store }>
                        <WithStylesContext onInsertCss={styles => {
                            css.add(styles._getCss());
                        }}>
                            <RouterContext { ...renderProps }/>
                        </WithStylesContext>
                    </Provider>
                );
                const content = ReactDOMServer.renderToString(component);
                if(renderProps.routes.find(route => route.status === 404)) {
                    ctx.status = 404;
                }
                ctx.response.type = 'text/html';
                ctx.body = `<!DOCTYPE html>
                    ${ReactDOMServer.renderToStaticMarkup(
                    <Html 
                    content={ content } 
                    state={ reduxState }
                    css={ Array.from(css) }/>)}`
                return resolve();
            }
        });
    })
}