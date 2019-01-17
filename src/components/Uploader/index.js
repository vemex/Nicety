import Uploader from './src/uploader';

/* istanbul ignore next */
export default {

    install: function (Vue) {
        Vue.component(Uploader.name, Uploader);
    }
}
