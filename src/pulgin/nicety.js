import VueRouter from "vue-router"
import Vuex from 'vuex'
import AppBreadcrumb from '../../src/store/app.breadcrumb'
import AppConstants from '../../src/store/app.constants'
import AppNav from '../../src/store/app.nav'
import AppViewSettings from '../../src/store/app.view.settings'


const Nicety = {};


function isEmptyObject(obj) {
    for (let key in obj) {
        return false
    }
    return true
};

let initStore = function (Vue, options) {
    Vue.use(Vuex);
    let store = null;
    let initModules = {
        AppBreadcrumb,
        AppConstants,
        AppNav,
        AppViewSettings
    };
    if (options.storeModules && !isEmptyObject(options.storeModules)) {
        store = new Vuex.Store({
            modules: {
                ...initModules,
                ...options.storeModules
            }
        });
    } else {
        store = new Vuex.Store({
            modules: {
                ...initModules
            }
        });
    }

    let appStore = {
        $store: store,
    };
    return appStore;
};

let initRoutes = function (Vue, options, appStore) {
    Vue.use(VueRouter);
    let router = new VueRouter({routes: options.routes, linkActiveClass: "active"});
    appStore.$store.dispatch('AppNav/initRoutes', options.routes);
    router.beforeEach(function (to, from, next) {
        appStore.$store.dispatch("AppNav/activeRoute", to);
        if (options.appSettings.useTabView) {
            appStore.$store.dispatch("AppNav/openTab", to);
        }
        $('#dashboard-app > div > main').nyOverlay({title: 'LOADING', target: '#dashboard-app > div > main'});
        next();
    });
    router.afterEach(function () {
        $('#dashboard-app > div > main').nyOverlay('hide');
    });
    return router;
};

Nicety.install = function (Vue, options) {
    let appStore = initStore(Vue, options);
    let router = initRoutes(Vue, options, appStore);
    appStore.$store.commit("AppConstants/setVersion",options.appSettings.version);
    appStore.$store.commit("AppConstants/setSiteName",options.appSettings.siteName);
    appStore.$store.commit("AppConstants/setCopyright",options.appSettings.copyright);
    appStore.$store.commit("AppConstants/setCopyrightTimeRange",options.appSettings.copyrightTimeRange);
    appStore.$store.commit("AppConstants/setLang",options.appSettings.lang);
    appStore.$store.commit("AppViewSettings/setUseTabView",options.appSettings.useTabView);
    new Vue({
        store: appStore.$store,
        el: '#app',
        router: router,
        render: h => h(options.mainComponent)
    });
// 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
// 逻辑...
    }

// 2. 添加全局资源
    Vue.directive('my-directive', {
        bind(el, binding, vnode, oldVnode) {
// 逻辑...
        }
    })

// 3. 注入组件
    Vue.mixin({
        created: function () {
// 逻辑...
        }
    })

// 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
// 逻辑...
    }
}

export default Nicety