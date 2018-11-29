import Axios from 'axios';
import {processError} from '../utils/util';
let defaultAuthOptions = {
    getCurrentUserUrl: '/api/v1/security/login/success',
    loginUrl: '/api/v1/security/login',
    logoutUrl: '/api/v1/security/logout',
    logoutSuccessUrl: './login.html',
    loginPage: './login.html',
    isInRole: function (authManager, userInfo, route) {
        let result = userInfo.roles.filter(function (role) {
            return role.code === route.meta.role;
        });
        return result.length > 0;
    },
    hasPermission: function (authManager, userInfo, route) {
        let roleResult = userInfo.roles.filter(function (role) {
            let filterPermissions = role.permissions.filter(function (permission) {
                return permission.code === route.meta.permission;
            });
            return filterPermissions.length > 0;
        });
        let permissionResult = userInfo.permissions.filter(function (permission) {
            return permission.code === route.meta.permission;
        });
        return roleResult.length > 0 || permissionResult.length > 0;
    }
};

class SecurityManager {
    constructor (options) {
        this.options = Object.assign({}, defaultAuthOptions, options);
    }

    getCurrentUser () {
        if (this.currentUser) return Promise.resolve(this.currentUser);
        let _ = this;
        return Axios.get(this.options.getCurrentUserUrl).then(function (response) {
            if (response.data.state === 'Successfully') {
                _.currentUser = response.data.content;
                return _.currentUser;
            }
        });
    }

    checkUrl (route) {
        if (route.meta.role) {
            if (!this.currentUser) {
                return false;
            }
            return this.options.isInRole(this, this.currentUser, route);
        }
        if (route.meta.permission) {
            if (!this.currentUser) {
                return false;
            }
            return this.options.hasPermission(this, this.currentUser, route);
        }
        return true;
    }

    logout () {
        return Axios.get(this.options.logoutUrl).then(function (response) {
            window.location.href = response.request.responseURL;
        });
    }

    login (userName, password) {
        let _ = this;
        return Axios.request({
            method: 'post',
            url: this.options.loginUrl,

            data: {
                username: userName,
                password: password
            },
            transformRequest: [function (data) {
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
                return ret;
            }]
        }).then(function (response) {
            if (response.data.state === 'Successfully') {
                _.currentUser = response.data.content;
            }
            if (response.data.state === 'Failed') {
                return processError(response.data);
            }
            return response.data;
        });
    }

    redirectLoginPage () {
        window.location.href = this.options.loginPage;
    }
}

export default SecurityManager;
