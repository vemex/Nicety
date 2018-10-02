// initial state

const state = {
    routes: [],
    openTabs: [],
    activePath: ""
};

// getters
const getters = {
    routes: state => state.routes,
    openTabs: state => state.openTabs,
    activePath: state => state.activePath,
};

// actions
const actions = {
    /**
     * 初始化路由数据
     * @param dispatch
     * @param commit
     * @param getters
     * @param routes
     */
    initRoutes({dispatch, commit, getters}, routes) {
        commit("init", routes);
        commit("pushTab", "/")
    },
    /**
     * 将路由置为 active 状态
     * @param dispatch
     * @param commit
     * @param getters
     * @param route
     */
    activeRoute({dispatch, commit, getters}, route) {
        commit("setRouteActive", route);
    },
    openTab({dispatch, commit, getters}, router) {
        commit("pushTab", router)
    },
    closeTab({dispatch, commit, getters}, path) {
        return commit("removeTab", path)
    }
};
/**
 * 遍历路由
 * @param routes
 * @param parent
 * @param fn
 */
let loopRoute = function (routes, parent, fn) {
    routes.forEach(function (value) {
        if (value.children) {
            loopRoute(value.children, value, fn)
        }
        fn(parent, value);
    });
};
/**
 * 创建路由
 * @param originRoute
 * @returns {{name: *, path: *, meta: *}}
 */
let createRoute = function (originRoute) {
    let meta = originRoute.meta;
    if (meta.active === undefined) {
        meta.active = false;
    }
    return {
        name: originRoute.name,
        path: originRoute.path,
        meta: meta,
    }
};
/**
 * 复制路由数据
 * @param routes
 * @returns {Array}
 */
let copyRoutes = function (routes, parent) {
    let result = [];
    routes.forEach(function (value) {
        if (value.meta.display) {
            let newRoute = createRoute(value);
            newRoute.meta.canClose = newRoute.path !== '/';
            if (value.children) {
                newRoute.children = copyRoutes(value.children, value);
            }
            result.push(newRoute)
        }
    });
    return result;
};

// mutations
const mutations = {

    init(state, routes) {
        state.routes = copyRoutes(routes);
    },
    setRouteActive(state, route) {
        loopRoute(state.routes, null, function (parent, value) {
            value.meta.active = false;
        });
        loopRoute(state.routes, null, function (parent, value) {
            if (route.fullPath === value.path) {
                value.meta.active = true;
                if (parent != null) {
                    parent.meta.active = true;
                }
            }
        })
    },
    pushTab(state, router) {
        let path=undefined;
        if (router instanceof  Object){
            path=router.fullPath;
        } else{
            path=router;
        }
        let findRouter=undefined;
        loopRoute(state.routes, null, function (parent, value) {
            if (path === value.path) {
                findRouter=value;
            }
        });
        if (findRouter) {
            let findItem = null;
            state.openTabs.forEach(function (value) {
                value.active = false;
                if (value.url === path) {
                    findItem = value;
                }
            });
            state.activePath = path;
            if (findItem !== null) {
                findItem.active = true
            } else {
                state.openTabs.push({url: path, active: true, display: findRouter.meta.display,canClose:findRouter.meta.canClose});
            }
        }

    },
    removeTab(state, url) {
        if (state.openTabs.length == 1) {
            return;
        }
        let findItem = null;
        state.openTabs.forEach(function (value) {
            if (value.url === url) {
                findItem = value;
            }
        });
        if (findItem !== null) {
            let index = state.openTabs.indexOf(findItem);
            state.openTabs.splice(index, 1);
            let newItem = null;
            if (index >= state.openTabs.length) {
                newItem = state.openTabs[index - 1]
            } else {
                newItem = state.openTabs[index]
            }
            if (newItem !== undefined && newItem.url !== state.activePath) {
                state.openTabs.forEach(function (value) {
                    value.active = false;
                });
                newItem.active = true;
                state.activePath = newItem.url;
            }
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}