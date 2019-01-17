import BaseInput from '../../../Inputs/BaseInput.vue';

let TextInputRender = {
    name: 'TextInputRender',
    extends: BaseInput,
    props: {
        rowData:[Object],
        type: {type: String, default: 'text'}
    },
    watch:{
        value:function () {

        }
    },
    created(){

    }
};
export default TextInputRender;
