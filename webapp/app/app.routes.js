import Home from "./pages/Home.vue"
import ThemeColor from "./pages/ThemeColor.vue"
import About from "./pages/About.vue"


const routes = [
    { path: '/Home', component: Home },
    { path: '/ThemeColor', component: ThemeColor },
    { path: '/About', component: About }
];
// export default {
//     '/': 'Home',
//     '/about': 'About',
//     '/ThemeColor': 'ThemeColor'
// }

export default routes;