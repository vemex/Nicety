import Axios from 'axios';
import {processError} from '../utils/util';

let defaultAuthOptions = {
    getCurrentUserUrl: 'security/login/success',
    loginUrl: 'security/login',
    logoutUrl: 'security/logout',
    logoutSuccessUrl: './login.html',
    loginPage: './login.html',
    isInRole: function (authManager, userInfo, roleCode) {
        let result = userInfo.roles.filter(function (role) {
            return role.code === roleCode;
        });
        return result.length > 0;
    },
    hasPermission: function (authManager, userInfo, permissionCode) {
        let roleResult = userInfo.roles.filter(function (role) {
            let filterPermissions = role.permissions.filter(function (permission) {
                return permission.code === permissionCode;
            });
            return filterPermissions.length > 0;
        });
        let permissionResult = userInfo.permissions.filter(function (permission) {
            return permission.code === permissionCode;
        });
        return roleResult.length > 0 || permissionResult.length > 0;
    }
};

class SecurityManager {
    constructor(options) {
        this.options = Object.assign({}, defaultAuthOptions, options);
    }

    getCurrentUser() {
        if (this.currentUser) return Promise.resolve(this.currentUser);
        let _ = this;
        return Axios.get(this.options.getCurrentUserUrl).then(function (data) {
            if (!data) {
                return false;
            }
            _.currentUser = data;
            _.currentUser.hasPermission = _.options.hasPermission;
            return _.currentUser;
        });
    }

    isInRoel(role) {
        if (this.currentUser) {
            return this.options.isInRole(this, this.currentUser, role);
        }
        return false;
    }

    hasPermission(permission) {
        if (this.currentUser) {
            return this.currentUser.hasPermission(this, this.currentUser, permission);
        }
        return false;
    }


    checkUrl(route) {
        let isInRole = false;
        let hasPermission = false;

        if (!(route.meta.role && route.meta.role !== '') && !(route.meta.permission && route.meta.permission !== '') ) {
            return true;
        }
        if (!this.currentUser) {
            return false;
        }
        if (route.meta.role && route.meta.role !== '') {
            var roles = route.meta.role.split(',');
            for (let role of roles) {
                isInRole = isInRole || this.options.isInRole(this, this.currentUser, role);
            }
        }
        if (route.meta.permission && route.meta.permission !== '') {
            var permissions = route.meta.permission.split(',');
            for (let permission of permissions) {
                hasPermission = hasPermission || this.options.hasPermission(this, this.currentUser, permission);
            }
        }
        return isInRole || hasPermission;
    }

    logout() {
        return Axios.get(this.options.logoutUrl);
    }

    login(userName, password) {
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
        });
    }

    redirectLoginPage() {
        window.location.href = this.options.baseURL + this.options.loginPage;
    }
}

export default SecurityManager;
