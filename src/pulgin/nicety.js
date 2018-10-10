import VueRouter from "vue-router"
import Vuex from 'vuex'
import AppBreadcrumb from '../../src/store/app.breadcrumb'
import AppConstants from '../../src/store/app.constants'
import AppNav from '../../src/store/app.nav'
import AppViewSettings from '../../src/store/app.view.settings'
import VueI18n from 'vue-i18n'
import LanguageManager from './languageManager'


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
let defaultOptions = {
    routes: [],
    mainComponent: {},
    storeModules: {},
    routeBeforeEach: function () {
        return Promise.resolve(true);
    },
    appSettings: {
        useTabView: false,
        version: "0.0.1",
        lang: "ZH-CN",
        copyright: "WANG WEI WEI",
        copyrightTimeRange: "2017-208",
        siteName: "Nicety"
    }
};
let initRoutes = function (Vue, options, appStore, languageManager) {
    options = $.extend({}, defaultOptions, options);
    Vue.use(VueRouter);
    let router = new VueRouter({routes: options.routes, linkActiveClass: "active"});
    appStore.$store.dispatch('AppNav/initRoutes', options.routes);
    router.beforeEach(function (to, from, next) {
        let lang = to.query.lang;
        if (lang) {
            lang = appStore.$store.getters['AppViewSettings/currentLang']
        } else {
            appStore.$store.commit("AppViewSettings/setCurrentLang", lang);
        }
        languageManager.loadLanguageAsync(lang).then(function (lang) {
            appStore.$store.dispatch("AppNav/activeRoute", to);
            if (options.appSettings.useTabView) {
                appStore.$store.dispatch("AppNav/openTab", to);
            }
            options.routeBeforeEach(appStore.$store).then(function (data) {
                if (data) {
                    $('#dashboard-app > div > main').nyOverlay({
                        title: 'LOADING',
                        target: '#dashboard-app > div > main'
                    });
                    next();
                }
            });

        });

    });
    router.afterEach(function () {
        $('#dashboard-app > div > main').nyOverlay('hide');
    });
    return router;
};

Nicety.install = function (Vue, options) {
    let appStore = initStore(Vue, options);

    appStore.$store.commit("AppConstants/setVersion", options.appSettings.version);
    appStore.$store.commit("AppConstants/setSiteName", options.appSettings.siteName);
    appStore.$store.commit("AppConstants/setCopyright", options.appSettings.copyright);
    appStore.$store.commit("AppConstants/setCopyrightTimeRange", options.appSettings.copyrightTimeRange);
    appStore.$store.commit("AppConstants/setDefaultLang", options.appSettings.defaultLang);//设置默认语言
    appStore.$store.commit("AppViewSettings/setCurrentLang", options.appSettings.defaultLang);//设置当前语言
    appStore.$store.commit("AppViewSettings/setUseTabView", options.appSettings.useTabView);

    Vue.use(VueI18n);
    let lang = appStore.$store.getters['AppConstants/defaultLang'];
    const i18n = new VueI18n({
        locale: "", // set locale
        fallbackLocale: lang,
        messages: {}
    });
    let languageManager = new LanguageManager(i18n, lang);

    let router = initRoutes(Vue, options, appStore, languageManager);
    languageManager.loadLanguageAsync(lang).then(function (lang) {
        new Vue({
            i18n,
            store: appStore.$store,
            el: '#app',
            router: router,
            render: h => h(options.mainComponent)
        });
    });
    if(options.init) {
        options.init(appStore.$store,router,languageManager)
    }
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
    Vue.mixin(
        {
            components: {
                ...options.components
            }
        });

// 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
// 逻辑...
    }
}

export default Nicety