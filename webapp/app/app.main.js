 import './vendor.js';

import Vue from "vue"
import VueRouter from "vue-router"
//
import routes from './app.routes'
//
import AppView from "./components/app.vue"
//
Vue.use(VueRouter);
//
const router = new VueRouter({
    routes: routes,
    linkActiveClass: "active"
});
//
const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(AppView)
});