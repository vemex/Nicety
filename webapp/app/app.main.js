 import './vendor.js';
//require("jquery")
//TODO replace scss file in vendor scss
 import "../../node_modules/ag-grid/dist/styles/ag-grid.css";

import Vue from "vue"
import VueRouter from "vue-router"
//
import routes from './app.routes'
//
import AppView from "./components/app.vue"
//
//require("expose-loader?Popper!popper.js")
// window.bootstrap = require("exports-loader?bootstrap!bootstrap")
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