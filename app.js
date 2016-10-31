import Koa from 'koa';
import body from 'koa-better-body';
import json from 'koa-json';
import mount from 'koa-mount';
import compress from 'koa-compress';
import router from './Server/Router';
import controller from './Server/Controller';
import serve from 'koa-static';
import serverRender from './Server/View/boot.js';
import errorBoot from './Server/View/errorBoot.js';
console.log(fetch);

const app = new Koa();
const expire = 86400000 * 30;
app
.use(compress())
.use(serve('public')) // 提供伺服器檔案 例如：robots.txt ，放在 public 資料夾
.use(mount('/static', serve('./static', { maxage: expire }))) // 提供 webpack 產生的檔案
.use(body())
.use(json())
.use(router.routes()) // 如果有 API 跟 react server render 在同一個 host，可以在這裡插入 API 的路由 
.use(router.allowedMethods())
.use(serverRender) // 進入 React Server Render
.use(errorBoot) // 錯誤處理
.listen(process.env.PORT || 8080, () => {
    console.log('listen http://localhost:8080')
});