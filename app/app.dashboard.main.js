import './vendor.js';
import '../src/index'
import Vue from "vue"
import Vuex from 'vuex'
import VueRouter from "vue-router"
//
import routes from './app.routes'
//
import AppView from "./components/app.dashboard.vue"

import store from './store/index'

var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);

import Nicety from '../src/pulgin/nicety'

Vue.use(Nicety, {
    routes: routes,
    mainComponent: AppView,
    storeModules: store,
    appSettings: {
        useTabView: true,
        version:"0.0.1",
        lang:"ZH-CN",
        copyright:"WANG WEI WEI",
        copyrightTimeRange:"2017-208",
        siteName:"Nicety"
    }
});
//
// Vue.use(VueRouter);
//
// const router = new VueRouter({
//     routes: routes,
//     linkActiveClass: "active"
// });
//
// let appStore= {
//     $store: store,
// };
// appStore.$store.dispatch('AppNav/initRoutes',routes);
// router.beforeEach(function(to, from, next) {
//     appStore.$store.dispatch("AppNav/activeRoute",to);
//     appStore.$store.dispatch("AppNav/openTab",to);
//     $('#dashboard-app > div > main').nyOverlay({ title: 'LOADING', target: '#dashboard-app > div > main' });
//     next();
// });
// router.afterEach(function() {
//     $('#dashboard-app > div > main').nyOverlay('hide');
// });


//
// const app = new Vue({
//     store,
//     el: '#app',
//     //router: router,
//     render: h => h(AppView)
// });