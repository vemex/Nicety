import VueRouter from 'vue-router';
import Vuex from 'vuex';
import AppBreadcrumb from '../../src/store/app.breadcrumb';
import AppConstants from '../../src/store/app.constants';
import AppNav from '../../src/store/app.nav';
import AppViewSettings from '../../src/store/app.view.settings';
import VueI18n from 'vue-i18n';
import LanguageManager from './languageManager';
import vueLogger from 'vue-logger';
import loading from '../components/Loading';
import tooltip from '../components/Tooltip';

const Nicety = {};
let defaultOptions = {
    routes: [], // 路由
    mainComponent: {}, // 主要内容对象
    storeModules: {
        AppBreadcrumb,
        AppConstants,
        AppNav,
        AppViewSettings
    }, // vuex store
    router: {
        beforeEach: function (to, from) {
            return Promise.resolve(true);
        },
        afterEach: function (to, from) {
            return Promise.resolve(true);
        }
    },
    appSettings: {
        useTabView: false,
        version: '0.0.1',
        lang: 'ZH-CN',
        copyright: 'WANG WEI WEI',
        copyrightTimeRange: '2017-' + new Date().getFullYear(),
        siteName: 'Nicety'
    },
    logger: {
        prefix: () => new Date(),
        dev: true,
        shortname: true,
        levels: ['log', 'warn', 'debug', 'error'],
        forceLevels: []
    }
};

/**
 * 判断对象是否为空对象
 * @param obj 对象
 * @returns {boolean} 为空是返回 true
 */
function isEmptyObject (obj) {
    let array = [];
    for (let item in obj) {
        if (obj.hasOwnProperty(item)) {
            array.push(obj[item]);
        }
    }
    return array.length === 0;
}

/**
 * 初始化 VUEX store
 * @param Vue VUE 全局对象
 * @param options 选项参数
 * @returns {{$store: Store}} vuex store 对象
 */
let initStore = function (Vue, options) {
    Vue.use(Vuex);
    let store = null;
    if (options.storeModules && !isEmptyObject(options.storeModules)) {
        store = new Vuex.Store({
            modules: {
                ...options.storeModules
            }
        });
    }
    return {
        $store: store
    };
};
let routeLoading = null;
/**
 * 初始化路由
 * @param Vue VUE 全局对象
 * @param options 选项参数
 * @param appStore vuex store对象
 * @param languageManager 语言管理器
 * @returns {VueRouter} vue router 对象
 */
let initRoutes = function (Vue, options, appStore, languageManager) {
    Vue.use(VueRouter);
    let router = new VueRouter({routes: options.routes, linkActiveClass: 'active'});
    appStore.$store.dispatch('AppNav/initRoutes', options.routes);
    router.beforeEach(function (to, from, next) {
        let lang = to.query.lang;
        if (lang) {
            lang = appStore.$store.getters['AppViewSettings/currentLang'];
        } else {
            appStore.$store.commit('AppViewSettings/setCurrentLang', lang);
        }
        languageManager.loadLanguageAsync(lang).then(function (lang) {
            appStore.$store.dispatch('AppNav/activeRoute', to);
            if (options.appSettings.useTabView) {
                appStore.$store.dispatch('AppNav/openTab', to);
            }
            options.router.beforeEach(appStore.$store).then(function (data) {
                if (data) {
                    if (!routeLoading) {
                        routeLoading = loading.service({target: document.querySelector('#dashboard-app > div > main .page-content')});
                    }
                    next();
                }
            });
        });
    });
    router.afterEach(function () {
        if (routeLoading) {
            routeLoading.close();
        }
        routeLoading = null;
    });
    return router;
};

let defaultLoggerConfig = {
    prefix: () => new Date(),
    dev: true,
    shortname: true,
    levels: ['log', 'warn', 'debug', 'error'],
    forceLevels: []
};
let initLogger = function (Vue, loggerConfig) {
    let config = Object.assign(defaultLoggerConfig, loggerConfig);
    Vue.use(vueLogger, config);
};

Nicety.install = function (Vue, options) {
    let newOptions = Object.assign({}, defaultOptions, options);
    newOptions.appSettings = Object.assign({}, defaultOptions.appSettings, options.appSettings);
    newOptions.logger = Object.assign({}, defaultOptions.logger, options.logger);
    newOptions.router = Object.assign({}, defaultOptions.router, options.router);
    newOptions.storeModules = Object.assign({}, defaultOptions.storeModules, options.storeModules);
    initLogger(Vue, newOptions.logger);

    let appStore = initStore(Vue, newOptions);
    appStore.$store.commit('AppConstants/setVersion', newOptions.appSettings.version);
    appStore.$store.commit('AppConstants/setSiteName', newOptions.appSettings.siteName);
    appStore.$store.commit('AppConstants/setCopyright', newOptions.appSettings.copyright);
    appStore.$store.commit('AppConstants/setCopyrightTimeRange', newOptions.appSettings.copyrightTimeRange);
    appStore.$store.commit('AppConstants/setDefaultLang', newOptions.appSettings.defaultLang);// 设置默认语言
    appStore.$store.commit('AppViewSettings/setCurrentLang', newOptions.appSettings.defaultLang);// 设置当前语言
    appStore.$store.commit('AppViewSettings/setUseTabView', newOptions.appSettings.useTabView);

    Vue.use(VueI18n);
    let lang = appStore.$store.getters['AppConstants/defaultLang'];
    const i18n = new VueI18n({
        locale: '', // set locale
        fallbackLocale: lang,
        messages: {}
    });
    let languageManager = new LanguageManager(i18n, lang);

    let router = initRoutes(Vue, newOptions, appStore, languageManager);
    languageManager.loadLanguageAsync(lang).then(function (lang) {
        // eslint-disable-next-line no-new
        new Vue({
            i18n,
            store: appStore.$store,
            el: '#app',
            router: router,
            render: h => h(options.mainComponent)
        });
    });
    if (newOptions.init) {
        newOptions.init(appStore.$store, router, languageManager);
    }
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
        // 逻辑...
    };
    loading.install(Vue);
    tooltip.install(Vue);
    // 2. 添加全局资源
    // Vue.directive('my-directive', {
    //     bind (el, binding, vnode, oldVnode) {
    //         // 逻辑...
    //     }
    // });

    // 3. 注入组件
    Vue.mixin(
        {
            components: {
                ...options.components
            }
        });

    // 4. 添加实例方法
    // Vue.prototype.$myMethod = function (methodOptions) {
    //     // 逻辑...
    // };
};

export default Nicety;
