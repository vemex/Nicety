// import './overlay'
//import './notification';
// import './checkbox';
// import './gridster/index';


import loading from './components/Loading';
import tooltip from './components/Tooltip';
import menu from './components/Menu/index';
import MessageBox from './components/MessageBox'
import checkBox from './components/Checkbox/index.js'
import DataGrid from './components/DataGrid'
import Dialog from './components/Dialog'
import Pagination from './components/Pagination'
import Scrollbar from './components/Scrollbar'
import Select from './components/Select/index'
import Tag from './components/Tag/index'
import Tooltip from './components/Tooltip'
import Uploader from './components/Uploader'
import Form from './components/Form'
import Tree from './components/Tree/index'
import Assists from './components/Assists/index'
import Layout from './components/Layout'
import Inputs from './components/Inputs'
import DatePicker from './components/DatePicker'
import InputNumber from './components/InputNumber'
import Notification from './components/Notification'
import Directives from './directives'


export default {
    install: function (Vue) {
        MessageBox.install(Vue);
        loading.install(Vue);
        tooltip.install(Vue);
        menu.install(Vue);
        checkBox.install(Vue);
        DataGrid.install(Vue);
        Dialog.install(Vue);
        Pagination.install(Vue);
        Scrollbar.install(Vue);
        Select.install(Vue);
        Tag.install(Vue);
        Tooltip.install(Vue);
        Uploader.install(Vue);
        Form.install(Vue);
        Tree.install(Vue);
        Assists.install(Vue);
        Layout.install(Vue);
        Inputs.install(Vue);
        DatePicker.install(Vue);
        InputNumber.install(Vue);
        Notification.install(Vue);
        Directives.install(Vue)
    }
};

