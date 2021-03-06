import VueRouter from 'vue-router';
import Vuex from 'vuex';
import AppBreadcrumb from '../../src/store/app.breadcrumb';
import AppConstants from '../../src/store/app.constants';
import AppNav from '../../src/store/app.nav';
import AppViewSettings from '../../src/store/app.view.settings';
import VueI18n from 'vue-i18n';
import LanguageManager from './languageManager';
import SecurityManager from './SecurityManager';
import vueLogger from 'vue-logger';
import ComponentIndex from '../index'
import loading from '../components/Loading';


const NotPermission = resolve => require.ensure([], () => resolve(require('../components/app.common.notPermission.vue')), 'NotPermission');


const Nicety = {};
let defaultOptions = {
    routes: [], // 路由
    mainComponent: {}, // 主要内容对象
    apiURL: "",
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
function isEmptyObject(obj) {
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
 * @param securityManager 安全管理对象
 * @returns {VueRouter} vue router 对象
 */
let initRoutes = function (Vue, options, appStore, languageManager, securityManager) {
    Vue.use(VueRouter);
    let router = new VueRouter({routes: options.routes, linkActiveClass: 'active'});
    appStore.$store.dispatch('AppNav/initRoutes', {routes: options.routes, homeRoute: router.matcher.match("/")});
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
            if (!securityManager.checkUrl(to)) {
                if (!securityManager.currentUser) {
                    securityManager.redirectLoginPage();
                    return;
                }
                router.push(
                    {path: '/NotPermission/', query: {url: to.fullPath}});
                return;
            }
            options.router.beforeEach(appStore.$store).then(function (data) {
                if (data) {
                    if (!routeLoading) {
                        routeLoading = loading.service({target: document.querySelector('#dashboard-app > div > main .main')});
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
    newOptions.routes.push({
        name: 'NotPermission',
        path: '/NotPermission/',
        component: NotPermission,
        props: (route) => ({docId: route.query.docId}),
        meta: {display: '没有权限', keepAlive: false, displayInNav: false}
    });
    initLogger(Vue, newOptions.logger);

    let appStore = initStore(Vue, newOptions);
    appStore.$store.commit('AppConstants/setVersion', newOptions.appSettings.version);
    appStore.$store.commit('AppConstants/setSiteName', newOptions.appSettings.siteName);
    appStore.$store.commit('AppConstants/setCopyright', newOptions.appSettings.copyright);
    appStore.$store.commit('AppConstants/setCopyrightTimeRange', newOptions.appSettings.copyrightTimeRange);
    appStore.$store.commit('AppConstants/setDefaultLang', newOptions.appSettings.defaultLang);// 设置默认语言
    appStore.$store.commit('AppViewSettings/setCurrentLang', newOptions.appSettings.defaultLang);// 设置当前语言
    appStore.$store.commit('AppViewSettings/setUseTabView', newOptions.appSettings.useTabView);
    //Vue.prototype.$i18n=i18n;
    Vue.use(VueI18n);
    let lang = appStore.$store.getters['AppConstants/defaultLang'];
    const i18n = new VueI18n({
        locale: '', // set locale
        fallbackLocale: lang,
        messages: {}
    });
    let languageManager = new LanguageManager(i18n, lang);
    let securityManager = new SecurityManager({
        apiURL: newOptions.apiURL,
        baseURL: newOptions.baseURL,
        requestBaseURL: newOptions.requestBaseURL
    });
    let router = initRoutes(Vue, newOptions, appStore, languageManager, securityManager);
    let siteLoading = loading.service({target: document.querySelector('body'), text: ''});
    Vue.prototype.router = router;
    Vue.prototype._i18n = i18n;
    Vue.prototype.$authorize = function (authorizes) {
        let authorizeCodes = authorizes.split(",");
        let isInRole = false;
        let hasPermission = false;
        for (let item of authorizeCodes) {
            isInRole = isInRole || securityManager.isInRoel(item);
        }
        for (let item of authorizeCodes) {
            hasPermission = hasPermission || securityManager.hasPermission(item);
        }
        return isInRole || hasPermission;
    }

    Promise.resolve(newOptions.resolveUser).then(
        function (data) {
            if (data) {
                siteLoading.text = '正在获取身份信息';

                return securityManager.getCurrentUser();
            } else {
                return {};
            }
        }
    ).then(function (data) {
        if (data == undefined) {
            securityManager.redirectLoginPage();
            return Promise.reject("用户未登录")
        }
        siteLoading.text = '正在获取语言信息';
        return languageManager.loadLanguageAsync(lang);
    }).then(function (lang) {
        if (newOptions.init) {
            newOptions.init(appStore.$store, router, languageManager);
        }
        // eslint-disable-next-line no-new
        siteLoading.close();
        new Vue({
            i18n,
            store: appStore.$store,
            el: '#app',
            router: router,
            render: h => h(options.mainComponent)
        });
    }).catch(function (err) {
        siteLoading.text = "加载失败，请刷新页面重试。";
    });

    ComponentIndex.install(Vue);
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
        // 逻辑...
    };
    Vue.prototype.$site = {
        baseURL: newOptions.baseURL,
        apiURL: newOptions.apiURL,
        requestBaseURL: newOptions.requestBaseURL
    };
    Vue.prototype.$securtyManager = securityManager;

    // 2. 添加全局资源
    // Vue.directive('permission', {
    //     bind (el, binding, vnode, oldVnode) {
    //         // 逻辑...
    //         console.log("permission")
    //     }
    // });
    for (let key in newOptions.directives) {
        Vue.directive(key, newOptions.directives[key]);
    }
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
