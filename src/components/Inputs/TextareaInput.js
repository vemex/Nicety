import BaseInput from './BaseInput.vue';

let TextareaInput = {
    name: 'TextareaInput',
    extends: BaseInput,
    props: {
        type: {type: String, default: 'textarea'}
    }
};
export default TextareaInput;
