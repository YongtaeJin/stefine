<template>
 	<v-app>
    	<v-app-bar app color="primary" dark hide-on-scroll>			
			<site-title />
			<v-spacer></v-spacer> 			
		</v-app-bar>
		
    	<v-main>			 
    		<router-view />			 
    	</v-main>
		
		<site-footer />
    	<vue-progress-bar></vue-progress-bar>
	</v-app>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import SiteFooter from './components/layout/SiteFooter.vue';
import SiteTitle from './components/layout/SiteTitle.vue';


export default {
  components: { SiteTitle, SiteFooter },
  name: "App",

  data() {
		return {
			drawer : true,
			loginchk : false,
		}
	},
	serverPrefetch() {		
		return new Promise((resolve, reject)=>{
			resolve();
		});
	},
	beforeCreate() {
		
	},
	created() {
		
	},
	beforeMount() {
		
	},
	mounted() {
		
	},

	computed : {
		drawerWidth() {
			return this.$vuetify.breakpoint.xs ? '100%' : '300';
		}
	},
	methods : {		
		toggleDrawer() {
			this.drawer = !this.drawer;
		}
		
	}
};
</script>

<style>

</style>