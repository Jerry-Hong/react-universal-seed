export default fetchCall => Component => {
	Component.onEnter = (store) => (nextState, replace, callback) => {
		const result = fetchCall(store.dispatch, store.getState(), nextState, replace) || Promise.resolve(true);
		if(!process.env.BROWSER) {
			result.then(() => {
				callback()
			}).catch((error) => {
				callback(error);
			})
		} else {
			callback();
		}
	}
	return Component;
}
