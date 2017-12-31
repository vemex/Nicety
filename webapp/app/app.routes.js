import Home from "./pages/Home.vue"

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


const routes = [
    {path: '/Home', component: Home},
    {path: '/ThemeColor', component: ThemeColor},
    {path: '/Alerts', component: Alerts},
    {path: '/About', component: About},
    {path: "/Badges", component: Badges},
    {path: "/Button", component: Button},
    {path: "/ButtonGroup", component: ButtonGroup},
    {path: "/Form", component: Form},
    {path: "/Popovers", component: Popovers},
    {path: "/Navbar", component: Navbar},
    {path: "/ListGroup", component: ListGroup},
    {path: "/Card", component: Card},
    {path: "/Collapse", component: Collapse},
    {path: "/Dropdown", component: Dropdown},
    {path: "/InputGroup", component: InputGroup},
    {path: "/Jumbotron", component: Jumbotron},
    {path: "/Modal", component: Modal},
    {path: "/Pagination", component: Pagination},
    {path: "/Navs", component: Navs},
    {path: "/Progress", component: Progress},
    {path: "/Scrollspy", component: Scrollspy},
    {path: "/Tooltips", component: Tooltips},
    {path: "/Grid", component: Grid},
    {path: "/Breadcrumb", component: Breadcrumb},
    {path: "/IconsThemify", component: IconsThemify},
    {path: "/PremiumLine", component: PremiumLine},
    {path: "/PremiumSolid", component: PremiumSolid},
    {path: "/UtilsDemo", component: UtilsDemo},
    {path: "/DataTable", component: DataTable},
    {path: "/Reboot", component: Reboot},
    {path: "/Display", component: Display},
    {path: "/AgGrid", component: AgGrid},
    {path: "/ECharts", component: ECharts},
    {path: "/Metismenu", component: Metismenu},
    {path: "/Flex", component: Flex}
];

export default routes;