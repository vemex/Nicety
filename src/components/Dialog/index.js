import NicetyDialog from './src/component';

/* istanbul ignore next */
export default{
    install : function (Vue) {
        Vue.component(NicetyDialog.name, NicetyDialog);
    }
}
