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

    {name:"",path: '/', component: Home},
    {name:"Home",path: '/Home', component: Home},
    {name:"Theme Color",path: '/ThemeColor', component: ThemeColor},
    {name:"Alerts",path: '/Alerts', component: Alerts},
    {name:"About",path: '/About', component: About},
    {name:"Badges",path: "/Badges", component: Badges},
    {name:"Button",path: "/Button", component: Button},
    {name:"ButtonGroup",path: "/ButtonGroup", component: ButtonGroup},
    {name:"Form",path: "/Form", component: Form},
    {name:"Popovers",path: "/Popovers", component: Popovers},
    {name:"Navbar",path: "/Navbar", component: Navbar},
    {name:"ListGroup",path: "/ListGroup", component: ListGroup},
    {name:"Card",path: "/Card", component: Card},
    {name:"Collapse",path: "/Collapse", component: Collapse},
    {name:"Dropdown",path: "/Dropdown", component: Dropdown},
    {name:"InputGroup",path: "/InputGroup", component: InputGroup},
    {name:"Jumbotron",path: "/Jumbotron", component: Jumbotron},
    {name:"Modal",path: "/Modal", component: Modal},
    {name:"Pagination",path: "/Pagination", component: Pagination},
    {name:"Navs",path: "/Navs", component: Navs},
    {name:"Progress",path: "/Progress", component: Progress},
    {name:"Scrollspy",path: "/Scrollspy", component: Scrollspy},
    {name:"Tooltips",path: "/Tooltips", component: Tooltips},
    {name:"Grid",path: "/Grid", component: Grid},
    {name:"Breadcrumb",path: "/Breadcrumb", component: Breadcrumb},
    {name:"IconsThemify",path: "/IconsThemify", component: IconsThemify},
    {name:"PremiumLine",path: "/PremiumLine", component: PremiumLine},
    {name:"PremiumSolid",path: "/PremiumSolid", component: PremiumSolid},
    {name:"UtilsDemo",path: "/UtilsDemo", component: UtilsDemo},
    {name:"DataTable",path: "/DataTable", component: DataTable},
    {name:"Reboot",path: "/Reboot", component: Reboot},
    {name:"Display",path: "/Display", component: Display},
    {name:"AgGrid",path: "/AgGrid", component: AgGrid},
    {name:"ECharts",path: "/ECharts", component: ECharts},
    {name:"Metismenu",path: "/Metismenu", component: Metismenu},
    {name:"Flex",path: "/Flex", component: Flex}
];

export default routes;