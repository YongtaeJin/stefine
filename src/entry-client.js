import { createApp } from "./main";
// import "./plugins-client/vue-toast";
// import "./plugins-client/vue-progressbar";
// import "./plugins-client/ezNotify";
import plugins from './plugins-client';
const { app, router, store } = createApp();

// if(window.__INITIAL_STATE__) {
// 	store.replaceState(window.__INITIAL_STATE__);
// }
function addStyle(href) {
	const style = document.createElement('link');
	style.href = href;
	style.rel = 'stylesheet';
	style.type = 'text/css';
	document.head.append(style);
}

addStyle('/css/style.css');
// addStyle('/css/ez-tiptap.min.css');


router.onReady(()=>{
	app.$mount('#app');
});