import './vendor.js';
import '../../src/index'
import Vue from "vue"
import Vuex from 'vuex'
import VueRouter from "vue-router"
//
import routes from './app.routes'
//
import AppView from "./components/app.dashboard.vue"

import store from './store'
var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);


//
Vue.use(VueRouter);
//
const router = new VueRouter({
    routes: routes,
    linkActiveClass: "active"
});

router.beforeEach(function(to, from, next) {
    $('#dashboard-app > div > main').nyOverlay({ title: 'LOADING', target: '#dashboard-app > div > main' });
    next();
})
router.afterEach(function() {
    $('#dashboard-app > div > main').nyOverlay('hide');
})



//
const app = new Vue({
    store,
    el: '#app',
    router: router,
    render: h => h(AppView)
});