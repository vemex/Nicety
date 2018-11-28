
import './vendor.js';
import '../src/index';
import Vue from 'vue';
import routes from './app.routes';
import AppView from './components/app.vue';
import store from './store/index';

import Nicety from '../src/pulgin/nicety';
import {VERSION} from './app.constants';

var $ = require('jquery');
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

Vue.use(Nicety, {
    routes: routes,
    mainComponent: AppView,
    storeModules: store,
    appSettings: {
        useTabView: true,
        version: VERSION,
        lang: 'ZH-CN',
        copyright: 'WANG WEI WEI',
        copyrightTimeRange: '2017-208',
        siteName: 'Nicety'
    }
});
