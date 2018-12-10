import BaseInput from './BaseInput.vue';

let PasswordInput = {
    name: 'PasswordInput',
    extends: BaseInput,
    props: {
        type: {type: String, default: 'password'}
    }
};
export default PasswordInput;
