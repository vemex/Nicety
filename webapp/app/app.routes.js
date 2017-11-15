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
    { path: "/Breadcrumb", component: Breadcrumb }
];
// export default {
//     '/': 'Home',
//     '/about': 'About',
//     '/ThemeColor': 'ThemeColor'
// }

export default routes;