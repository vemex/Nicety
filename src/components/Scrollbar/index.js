import Scrollbar from './src/main';

/* istanbul ignore next */
export default {
    install: function (Vue) {
        Vue.component(Scrollbar.name, Scrollbar);
    }
}
