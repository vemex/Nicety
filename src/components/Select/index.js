import Select from './src/select';
import option from './src/option';
import optionGroup from './src/option-group';

/* istanbul ignore next */
export default {
    install: function (Vue) {
        Vue.component(Select.name, Select);
        Vue.component(option.name, option);
        Vue.component(optionGroup.name,optionGroup);
    }
};
