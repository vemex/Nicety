import './vendor.js';
import Vue from "vue/dist/vue.js"
import VueRouter from "vue-router"

import routes from './app.routes'
import MainLayout from './layouts/Main.vue'

import AppView from "./components/app.vue"

require("expose-loader?Popper!popper.js")
window.bootstrap = require("exports-loader?bootstrap!bootstrap")


Vue.use(VueRouter)


const router = new VueRouter({
    routes: routes,
    linkActiveClass: "active"
});
// export default {
//     '/': 'Home',
//     '/about': 'About',
//     '/ThemeColor': 'ThemeColor'
// }

// new Vue({
//   el: '#app', 
//   data: {
//     currentRoute: window.location.pathname 
//   },
//   computed: {
//     ViewComponent () {
//       const matchingView = routes[this.currentRoute]
//       let component= matchingView
//         ? require('./pages/' + matchingView + '.vue')
//         : require('./pages/404.vue');
//       return component.default? 
//            component.default:component; 
//     }
//   },
//   render (h) {
//     return h(this.ViewComponent)
//   }
// })

// window.addEventListener('popstate', () => {
//   app.currentRoute = window.location.pathname
// })

const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(AppView)
})