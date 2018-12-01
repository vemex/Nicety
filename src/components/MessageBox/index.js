import MessageBox from './src/main.js';

export default {
    install: function (Vue) {
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$confirm = MessageBox.confirm;
    }
};
