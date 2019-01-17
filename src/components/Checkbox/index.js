import NicetyCheckBoxGroup from './src/CheckBoxGroup';
import CheckBox from './src/Checkbox';


export default {
    install:function(Vue){
        Vue.component(NicetyCheckBoxGroup.name, NicetyCheckBoxGroup);
        Vue.component(CheckBox.name, CheckBox);
    }
};
