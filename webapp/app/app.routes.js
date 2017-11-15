import Home from "./pages/Home.vue"
import ThemeColor from "./pages/ThemeColor.vue"
import About from "./pages/About.vue"
import Alerts from "./pages/Alerts.vue"
import Badges from "./pages/Badges.vue"
import Breadcrumb from "./pages/Breadcrumb.vue"


const routes = [
    { path: '/Home', component: Home },
    { path: '/ThemeColor', component: ThemeColor },
    { path: '/Alerts', component: Alerts },
    { path: '/About', component: About },
    { path: "/Badges", component: Badges },
    { path: "/Breadcrumb", component: Breadcrumb }
];
// export default {
//     '/': 'Home',
//     '/about': 'About',
//     '/ThemeColor': 'ThemeColor'
// }

export default routes;