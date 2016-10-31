import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTitle } from '../../Reducers/home/index.js';
import styles from './Home.scss';
import fetchData from '../../Decorate/fetchData.js';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

@withStyles(styles)

@fetchData((dispatch, state, routeState, replace) => {
    return dispatch(fetchTitle());
})

@connect(state => ({ home: state.home }))
class Home extends Component {
	render() {
		const { home } = this.props;
		return (
			<div className={ styles.home }>
				<h1 className={ styles.test }>Hello AnnaSu</h1>
				<h2>{ home }</h2>
			</div>
		);
	}
}

export default Home;
