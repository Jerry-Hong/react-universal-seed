import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Html from './html.js';

export default function(ctx, next) {
    ctx.response.type = 'text/html';
    ctx.body = `<!DOCTYPE html>
        ${ReactDOMServer.renderToStaticMarkup(<Html />)}`;
    ctx.status = 206;
}