import Home from "./pages/Home.vue"
import ThemeColor from "./pages/ThemeColor.vue"
import About from "./pages/About.vue"
import Alerts from "./pages/Alerts.vue"
import Badges from "./pages/Badges.vue"
import Breadcrumb from "./pages/Breadcrumb.vue"
import Button from "./pages/Button.vue"
import ButtonGroup from "./pages/ButtonGroup.vue"
import Form from "./pages/Form.vue"
import Popovers from "./pages/Popovers.vue"
import Navbar from "./pages/Navbar.vue"
import ListGroup from "./pages/ListGroup.vue"
import Card from "./pages/Card.vue"
import Collapse from "./pages/Collapse.vue"
import Dropdown from "./pages/Dropdown.vue"
import InputGroup from "./pages/InputGroup.vue"
import Jumbotron from "./pages/Jumbotron.vue"
import Modal from "./pages/Modal.vue"
import Navs from "./pages/Navs.vue"
import Pagination from "./pages/Pagination.vue"
import Progress from "./pages/Progress.vue"
import Scrollspy from "./pages/Scrollspy.vue"
import Tooltips from "./pages/Tooltips.vue"
import Grid from "./pages/layout/Grid.vue"
import IconsThemify from "./pages/icons/themify.vue"
import UtilsDemo from "./pages/utils/UtilsDemo.vue"
import Flex from "./pages/layout/Flex.vue"
import DataTable from "./pages/layout/DataTable.vue"

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
    { path: "/UtilsDemo", component: UtilsDemo },
    { path: "/Flex", component: Flex },
    { path: "/DataTable", component: DataTable }
];

export default routes;