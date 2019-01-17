import Tooltip from './src/main';

/* istanbul ignore next */
export default {
    install: function (Vue) {
        Vue.component(Tooltip.name, Tooltip);
    }
};
