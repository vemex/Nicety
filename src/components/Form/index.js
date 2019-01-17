import Filed from './src/Field';
import Form from './src/Form';
import Fileds from './src/Fileds';

/* istanbul ignore next */
export default{
    install : function (Vue) {
        Vue.component(Filed.name, Filed);
        Vue.component(Form.name, Form);
        Vue.component(Fileds.name, Fileds);
    }
}
