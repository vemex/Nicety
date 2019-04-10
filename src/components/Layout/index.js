import Aside from './src/aside'
import Contianer from './src/container'
import Header from './src/header'
import Main from './src/main'

export default {
    install:function (Vue) {
        Vue.component(Aside.name, Aside);
        Vue.component(Contianer.name, Contianer);
        Vue.component(Header.name, Header);
        Vue.component(Main.name, Main);
    }
}
