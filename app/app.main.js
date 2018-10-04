import './vendor.js';
import '../src/index'
import Vue from "vue"
import routes from './app.routes'
import AppView from "./components/app.vue"
import store from './store/index'

var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);

import Nicety from '../src/pulgin/nicety'
import {VERSION} from './app.constants'

Vue.use(Nicety, {
    routes: routes,
    mainComponent: AppView,
    storeModules: store,
    appSettings: {
        useTabView: true,
        version: VERSION,
        lang: "ZH-CN",
        copyright: "WANG WEI WEI",
        copyrightTimeRange: "2017-208",
        siteName: "Nicety"
    }
});