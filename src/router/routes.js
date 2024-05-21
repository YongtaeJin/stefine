import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		
	},	
	{
		path: '/about',
		name: 'About',
		component: About,
		
	},	

	{
		path: '*',
		name: 'Error',
		component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
	},
]

export default routes;