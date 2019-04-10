import Notification from './src/main.js';
export default {
    install: function (Vue) {
        Vue.prototype.$notify = Notification;
    }
};
