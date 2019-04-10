import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import TextareaInput from './TextareaInput';
import TextInput from './TextInput';
import SelectInput from './SelectInput';

export default {
    install(Vue) {
        Vue.component(EmailInput.name, EmailInput);
        Vue.component(PasswordInput.name, PasswordInput);
        Vue.component(TextareaInput.name, TextareaInput);
        Vue.component(TextInput.name, TextInput);
        Vue.component(SelectInput.name, SelectInput);
    }
};
