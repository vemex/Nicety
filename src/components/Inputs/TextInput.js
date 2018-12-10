import BaseInput from './BaseInput.vue';

let TextInput = {
    name: 'TextInput',
    extends: BaseInput,
    props: {
        type: {type: String, default: 'text'}
    }
};
export default TextInput;
