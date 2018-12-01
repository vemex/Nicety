import NicetyDialog from './src/component';

/* istanbul ignore next */
NicetyDialog.install = function (Vue) {
    Vue.component(NicetyDialog.name, NicetyDialog);
};

export default NicetyDialog;
