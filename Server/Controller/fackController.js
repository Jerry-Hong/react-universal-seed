import Router from '../Router/';

Router.get('/api/demo', (ctx, next) => {
    ctx.body = {
        title: 'This is from Server'
    }
});
