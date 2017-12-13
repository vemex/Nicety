import Home from "./pages/Home.vue"
import ThemeColor from "./pages/ThemeColor.vue"
import About from "./pages/About.vue"
import Alerts from "./pages/components/Alerts.vue"
import Badges from "./pages/components/Badges.vue"
import Breadcrumb from "./pages/components/Breadcrumb.vue"
import Button from "./pages/components/Button.vue"
import ButtonGroup from "./pages/components/ButtonGroup.vue"
import Form from "./pages/components/Form.vue"
import Popovers from "./pages/components/Popovers.vue"
import Navbar from "./pages/components/Navbar.vue"
import ListGroup from "./pages/components/ListGroup.vue"
import Card from "./pages/components/Card.vue"
import Collapse from "./pages/components/Collapse.vue"
import Dropdown from "./pages/components/Dropdown.vue"
import InputGroup from "./pages/components/InputGroup.vue"
import Jumbotron from "./pages/components/Jumbotron.vue"
import Modal from "./pages/components/Modal.vue"
import Navs from "./pages/components/Navs.vue"
import Pagination from "./pages/components/Pagination.vue"
import Progress from "./pages/components/Progress.vue"
import Scrollspy from "./pages/components/Scrollspy.vue"
import Tooltips from "./pages/components/Tooltips.vue"
import Grid from "./pages/layout/Grid.vue"
import IconsThemify from "./pages/icons/themify.vue"
import PremiumLine from "./pages/icons/PremiumLine.vue"
import PremiumSolid from "./pages/icons/PremiumSolid.vue"
import UtilsDemo from "./pages/utils/UtilsDemo.vue"
import Flex from "./pages/layout/Flex.vue"
import DataTable from "./pages/layout/DataTable.vue"
import Reboot from "./pages/content/Reboot.vue"
//const Reboot = () => require("./pages/content/Reboot.vue") ;

const routes = [
    { path: '/Home', component: Home },
    { path: '/ThemeColor', component: ThemeColor },
    { path: '/Alerts', component: Alerts },
    { path: '/About', component: About },
    { path: "/Badges", component: Badges },
    { path: "/Button", component: Button },
    { path: "/ButtonGroup", component: ButtonGroup },
    { path: "/Form", component: Form },
    { path: "/Popovers", component: Popovers },
    { path: "/Navbar", component: Navbar },
    { path: "/ListGroup", component: ListGroup },
    { path: "/Card", component: Card },
    { path: "/Collapse", component: Collapse },
    { path: "/Dropdown", component: Dropdown },
    { path: "/InputGroup", component: InputGroup },
    { path: "/Jumbotron", component: Jumbotron },
    { path: "/Modal", component: Modal },
    { path: "/Pagination", component: Pagination },
    { path: "/Navs", component: Navs },
    { path: "/Progress", component: Progress },
    { path: "/Scrollspy", component: Scrollspy },
    { path: "/Tooltips", component: Tooltips },
    { path: "/Grid", component: Grid },
    { path: "/Breadcrumb", component: Breadcrumb },
    { path: "/IconsThemify", component: IconsThemify },
    { path: "/PremiumLine", component: PremiumLine },
    { path: "/PremiumSolid", component: PremiumSolid },
    { path: "/UtilsDemo", component: UtilsDemo },
    { path: "/DataTable", component: DataTable },
    { path: "/Reboot", component: Reboot },
    { path: "/Flex", component: Flex }
];

export default routes;