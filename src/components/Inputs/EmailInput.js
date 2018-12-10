import BaseInput from './BaseInput.vue';

let EmailInput = {
    name: 'EmailInput',
    extends: BaseInput,
    props: {
        type: {type: String, default: 'email'}
    }
};
export default EmailInput;
