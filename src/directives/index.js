import Resize from './resize'

export default {
    install: function (Vue) {
        Vue.directive("resize",Resize);
    }
};
