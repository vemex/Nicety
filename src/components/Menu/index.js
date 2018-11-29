import Menu from './src/menu';
import NicetyMenuItem from './src/menu-item';
import NicetyMenuItemGroup from './src/menu-item-group';
import NicetySubMenu from './src/submenu';

/* istanbul ignore next */
Menu.install = function (Vue) {
    Vue.component(Menu.name, Menu);
    Vue.component(NicetyMenuItem.name, NicetyMenuItem);
    Vue.component(NicetyMenuItemGroup.name, NicetyMenuItemGroup);
    Vue.component(NicetySubMenu.name, NicetySubMenu);
};

export default Menu;
