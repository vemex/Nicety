import Vue from 'vue'
import Vuex from 'vuex'
import AppNav from '../../src/store/app.nav'
import AppBreadcrumb from '../../src/store/app.breadcrumb'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        AppNav,AppBreadcrumb

    },
    plugins: []
})