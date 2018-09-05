import './vendor.js';
import '../../src/index'

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

router.beforeEach(function() {
    console.log('befor');
})
router.afterEach(function() {
    console.log('afeter');

})
const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(AppView)
});

var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);