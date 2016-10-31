import React, {Component, PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import assets from '../../static/assets.json';

export default class Html extends Component
{
    static propTypes = {
        content: PropTypes.string,
        state: PropTypes.string,
        css: PropTypes.array
    };

    render()
    {
        const { content = '', state = '', css = [] } = this.props;
        const html = 
        (
            <html lang="zh-tw">
            <head>   
                <style dangerouslySetInnerHTML={{
                    __html: css.join('') 
                }}></style>
            </head>

            <body>

                <div 
                id="root"
                dangerouslySetInnerHTML={{
                    __html: content 
                }}/>
         
                <script 
                dangerouslySetInnerHTML={{
                    __html: `window.storeState=${state};`
                }} />
                <script dangerouslySetInnerHTML={{
                    __html: `window.cssPath="${assets.js.css}";`
                }}/>
                <script src={ assets.vendor.js }></script>
                <script async src={ assets.js.js }></script>
            </body>
            </html>
        )

        return html
    }
}