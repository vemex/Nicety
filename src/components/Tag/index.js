import Tag from './src/tag';

/* istanbul ignore next */
export default {
    install: function (Vue) {
        Vue.component(Tag.name, Tag);
    }
};

