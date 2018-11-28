import Home from './pages/Home.vue';

const ThemeColor = resolve => require.ensure([], () => resolve(require('./pages/ThemeColor.vue')), 'ThemeColor');
const About = resolve => require.ensure([], () => resolve(require('./pages/About.vue')), 'About');
const Alerts = resolve => require.ensure([], () => resolve(require('./pages/components/Alerts.vue')), 'Alerts');
const Badges = resolve => require.ensure([], () => resolve(require('./pages/components/Badges.vue')), 'Badges');
const Breadcrumb = resolve => require.ensure([], () => resolve(require('./pages/components/Breadcrumb.vue')), 'Breadcrumb');
const Button = resolve => require.ensure([], () => resolve(require('./pages/components/Button.vue')), 'Button');
const ButtonGroup = resolve => require.ensure([], () => resolve(require('./pages/components/ButtonGroup.vue')), 'ButtonGroup');
const Form = resolve => require.ensure([], () => resolve(require('./pages/components/Form.vue')), 'Form');
const Popovers = resolve => require.ensure([], () => resolve(require('./pages/components/Popovers.vue')), 'Popovers');
const Navbar = resolve => require.ensure([], () => resolve(require('./pages/components/Navbar.vue')), 'Navbar');
const ListGroup = resolve => require.ensure([], () => resolve(require('./pages/components/ListGroup.vue')), 'ListGroup');
const Card = resolve => require.ensure([], () => resolve(require('./pages/components/Card.vue')), 'Card');
const Collapse = resolve => require.ensure([], () => resolve(require('./pages/components/Collapse.vue')), 'Collapse');
const Dropdown = resolve => require.ensure([], () => resolve(require('./pages/components/Dropdown.vue')), 'Dropdown');
const InputGroup = resolve => require.ensure([], () => resolve(require('./pages/components/InputGroup.vue')), 'InputGroup');
const Jumbotron = resolve => require.ensure([], () => resolve(require('./pages/components/Jumbotron.vue')), 'Jumbotron');
const Modal = resolve => require.ensure([], () => resolve(require('./pages/components/Modal.vue')), 'Modal');
const Navs = resolve => require.ensure([], () => resolve(require('./pages/components/Navs.vue')), 'Navs');
const Pagination = resolve => require.ensure([], () => resolve(require('./pages/components/Pagination.vue')), 'Pagination');
const Progress = resolve => require.ensure([], () => resolve(require('./pages/components/Progress.vue')), 'Progress');
const Scrollspy = resolve => require.ensure([], () => resolve(require('./pages/components/Scrollspy.vue')), 'Scrollspy');
const Tooltips = resolve => require.ensure([], () => resolve(require('./pages/components/Tooltips.vue')), 'Tooltips');
const Grid = resolve => require.ensure([], () => resolve(require('./pages/layout/Grid.vue')), 'Grid');
const IconsThemify = resolve => require.ensure([], () => resolve(require('./pages/icons/themify.vue')), 'IconsThemify');
const PremiumLine = resolve => require.ensure([], () => resolve(require('./pages/icons/PremiumLine.vue')), 'PremiumLine');
const PremiumSolid = resolve => require.ensure([], () => resolve(require('./pages/icons/PremiumSolid.vue')), 'PremiumSolid');
const UtilsDemo = resolve => require.ensure([], () => resolve(require('./pages/utils/UtilsDemo.vue')), 'UtilsDemo');
const Flex = resolve => require.ensure([], () => resolve(require('./pages/layout/Flex.vue')), 'Flex');
const DataTable = resolve => require.ensure([], () => resolve(require('./pages/content/DataTable.vue')), 'DataTable');
const Reboot = resolve => require.ensure([], () => resolve(require('./pages/content/Reboot.vue')), 'Reboot');
const Display = resolve => require.ensure([], () => resolve(require('./pages/utils/DisplayUtils.vue')), 'Display');
const AgGrid = resolve => require.ensure([], () => resolve(require('./pages/plugins/AgGrid.vue')), 'AgGrid');
const ECharts = resolve => require.ensure([], () => resolve(require('./pages/ECharts/ECharts.vue')), 'ECharts');
const Metismenu = resolve => require.ensure([], () => resolve(require('./pages/plugins/Metismenu.vue')), 'Metismenu');

const LayoutWarper = {
    template: `
      <router-view></router-view>
  `
};
const routes = [
    {name: 'Home', path: '/', component: Home, meta: {display: 'Home'}},
    {name: 'Theme_Color', path: '/ThemeColor', component: ThemeColor, meta: {display: 'Theme Color'}},
    {
        name: 'layout',
        path: '/layout',
        component: LayoutWarper,
        children: [
            {name: 'flex', path: '/flex', component: Flex, meta: {display: 'flex'}},
            {name: 'Grid', path: '/Grid', component: Grid, meta: {display: 'Grid'}},
            {name: 'Display', path: '/Display', component: Display, meta: {display: 'Display'}}
        ],
        meta: {display: 'layout'}
    },
    {
        name: 'content',
        path: '/content',
        component: LayoutWarper,
        children: [
            {name: 'Reboot', path: '/Reboot', component: Reboot, meta: {display: 'Reboot BaseLine'}},
            {name: 'DataTable', path: '/DataTable', component: DataTable, meta: {display: 'DataTable'}}
        ],
        meta: {display: 'Content'}
    },
    {
        name: 'Components',
        path: '/components',
        component: LayoutWarper,
        children: [
            {name: 'Alerts', path: '/Alerts', component: Alerts, meta: {display: 'Alerts'}},
            {name: 'Badges', path: '/Badges', component: Badges, meta: {display: 'Badges'}},
            {name: 'Button', path: '/Button', component: Button, meta: {display: 'Button'}},
            {name: 'ButtonGroup', path: '/ButtonGroup', component: ButtonGroup, meta: {display: 'Button Group'}},
            {name: 'Form', path: '/Form', component: Form, meta: {display: 'Form'}},
            {name: 'Popovers', path: '/Popovers', component: Popovers, meta: {display: 'Popovers'}},
            {name: 'Navbar', path: '/Navbar', component: Navbar, meta: {display: 'Navigation bar'}},
            {name: 'ListGroup', path: '/ListGroup', component: ListGroup, meta: {display: 'List Group'}},
            {name: 'Card', path: '/Card', component: Card, meta: {display: 'Card'}},
            {name: 'Collapse', path: '/Collapse', component: Collapse, meta: {display: 'Collapse'}},
            {name: 'Dropdown', path: '/Dropdown', component: Dropdown, meta: {display: 'Dropdown'}},
            {name: 'InputGroup', path: '/InputGroup', component: InputGroup, meta: {display: 'InputGroup'}},
            {name: 'Jumbotron', path: '/Jumbotron', component: Jumbotron, meta: {display: 'Jumbotron'}},
            {name: 'Modal', path: '/Modal', component: Modal, meta: {display: 'Modal'}},
            {name: 'Pagination', path: '/Pagination', component: Pagination, meta: {display: 'Pagination'}},
            {name: 'Navs', path: '/Navs', component: Navs, meta: {display: 'Navs'}},
            {name: 'Progress', path: '/Progress', component: Progress, meta: {display: 'Progress'}},
            {name: 'Scrollspy', path: '/Scrollspy', component: Scrollspy, meta: {display: 'Scrollspy'}},
            {name: 'Tooltips', path: '/Tooltips', component: Tooltips, meta: {display: 'Tooltips'}},
            {name: 'Breadcrumb', path: '/Breadcrumb', component: Breadcrumb, meta: {display: 'Breadcrumb'}}
        ],
        meta: {display: 'Components'}
    },
    {
        name: 'Plugins',
        path: '/Plugins',
        component: LayoutWarper,
        children: [
            {name: 'AgGrid', path: '/AgGrid', component: AgGrid, meta: {display: 'AgGrid'}},
            {name: 'ECharts', path: '/ECharts', component: ECharts, meta: {display: 'ECharts'}},
            {name: 'Metismenu', path: '/Metismenu', component: Metismenu, meta: {display: 'Metismenu'}}
        ],
        meta: {display: 'Plugins'}
    },
    {
        name: 'icons',
        path: '/icons',
        component: LayoutWarper,
        children: [
            {name: 'IconsThemify', path: '/IconsThemify', component: IconsThemify, meta: {display: 'Icons Themify'}},
            {name: 'PremiumLine', path: '/PremiumLine', component: PremiumLine, meta: {display: 'PremiumLine'}},
            {name: 'PremiumSolid', path: '/PremiumSolid', component: PremiumSolid, meta: {display: 'PremiumSolid'}}
        ],
        meta: {display: 'icons'}
    },
    {name: 'About', path: '/About', component: About, meta: {display: 'About'}},
    {name: 'Utils', path: '/UtilsDemo', component: UtilsDemo, meta: {display: 'Utils'}}
];

export default routes;
