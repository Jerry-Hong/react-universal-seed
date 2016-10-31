import { createFetch, base, accept, parseJSON, createStack, auth, header } from 'http-client';

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://localhost:8080/' : 'http://localhost:8000/';

const commonStack = createStack(
	base(baseUrl + 'api'),
	accept('application/json'),
	header('Content-Type', 'application/json; charset=utf-8'),
	parseJSON()
)

let fetch = createFetch(commonStack);

export default fetch;