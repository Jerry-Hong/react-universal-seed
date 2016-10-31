import React, { Component } from 'react';

// 非同步取得 CSS，應該獨立放到另一個檔案，為了 Demo 方便先寫在這裡
const asyncLoadCSS = (path) => {
	const firstScript = document.getElementsByTagName('script')[0];
	const cssLink = document.createElement('link');

	cssLink.rel = 'stylesheet';
	cssLink.href = path;

	firstScript.parentNode.insertBefore(cssLink, firstScript);
}

export default class App extends Component {
	componentDidMount() {
		// 這裡取得整包 CSS
		if(process.env.NODE_ENV === 'production')
			asyncLoadCSS(window.cssPath);
	}
	
	render() {
		return (
			<div>
				{ /* 把固定的版面放這裡  */}
				{ this.props.children }
			</div>
		);
	}
}
