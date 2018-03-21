<template>
    <nav class="sidebar-nav">
        <ul class="metismenu" id="main-menu">
            <li class="sidebar-search-wrapper">
                展示
                <!-- END RESPONSIVE QUICK SEARCH FORM -->
            </li>
            <router-link tag="li" to="/Home"><a>Home</a></router-link>

            <router-link tag="li" to="/ThemeColor"><a>ThemeColor</a></router-link>
            <li>
                <a class="has-arrow" href="#">
                    <i class="pli-folder"></i> Layout
                </a>
                <ul aria-expanded="true">
                    <router-link tag="li" to="/Grid"><a>Grid</a></router-link>
                    <router-link tag="li" to="/Flex"><a>Flex</a></router-link>
                    <router-link tag="li" to="/Display"><a>Display</a></router-link>
                </ul>
            </li>
            <li>
                <a class="has-arrow" href="#">
                    Content
                </a>
                <ul aria-expanded="true">
                    <router-link tag="li" to="/Reboot"><a>Reboot-baseline</a></router-link>
                    <router-link tag="li" to="/Typography"><a>Typography</a></router-link>
                    <router-link tag="li" to="/Code"><a>Code</a></router-link>
                    <router-link tag="li" to="/Images"><a>Images</a></router-link>
                    <router-link tag="li" to="/DataTable"><a>Tables</a></router-link>
                    <router-link tag="li" to="/Figures"><a>Figures</a></router-link>
                </ul>
            </li>
            <li>
                <a class="has-arrow" href="#">
                    Components
                </a>
                <ul caria-expanded="true">
                    <router-link tag="li" to="/Alerts"><a>Alerts</a></router-link>
                    <router-link tag="li" to="/Badges"><a>Badges</a></router-link>
                    <router-link tag="li" to="/Breadcrumb"><a>Breadcrumb</a></router-link>
                    <router-link tag="li" to="/Button"><a>Button</a></router-link>
                    <router-link tag="li" to="/ButtonGroup"><a>Button Group</a></router-link>
                    <router-link tag="li" to="/Card"><a>Card</a></router-link>
                    <router-link tag="li" to="/Collapse"><a>Collapse</a></router-link>
                    <router-link tag="li" to="/Dropdown"><a>Dropdown</a></router-link>
                    <router-link tag="li" to="/Form"><a>Form</a></router-link>
                    <router-link tag="li" to="/InputGroup"><a>InputGroup</a></router-link>
                    <router-link tag="li" to="/Jumbotron"><a>Jumbotron</a></router-link>
                    <router-link tag="li" to="/ListGroup"><a>ListGroup</a></router-link>
                    <router-link tag="li" to="/Modal"><a>Modal</a></router-link>
                    <router-link tag="li" to="/Navs"><a>Navs</a></router-link>
                    <router-link tag="li" to="/Navbar"><a>Navbar</a></router-link>
                    <router-link tag="li" to="/Pagination"><a>Pagination</a></router-link>
                    <router-link tag="li" to="/Popovers"><a>Popovers</a></router-link>
                    <router-link tag="li" to="/Progress"><a>Progress</a></router-link>
                    <router-link tag="li" to="/Scrollspy"><a>Scrollspy</a></router-link>
                    <router-link tag="li" to="/Tooltips"><a>Tooltips</a></router-link>
                </ul>
            </li>
            <li>
                <a class="has-arrow" href="#">
                    Plugins
                </a>
                <ul aria-expanded="true">
                    <router-link tag="li" to="/Metismenu"><a>Menu</a></router-link>
                    <router-link tag="li" to="/AgGrid"><a>AgGrid</a></router-link>
                    <router-link tag="li" to="/Alerts"><a>Tabs</a></router-link>
                    <router-link tag="li" to="/ECharts"><a>Charts</a></router-link>
                </ul>
            </li>
            <router-link tag="li" to="/UtilsDemo"><a class="nav-link">Utils</a></router-link>
            <router-link tag="li" to="/Navbar"><a class="nav-link">Widgets</a></router-link>
            <li>
                <a class="has-arrow" href="#">
                    Icons
                </a>
                <ul aria-expanded="true">
                    <router-link tag="li" to="/IconsThemify"><a>Icons Themify</a></router-link>
                    <router-link tag="li" to="/PremiumLine"><a>Icons Premium Line</a></router-link>
                    <router-link tag="li" to="/PremiumSolid"><a>Icons Premium Solid</a></router-link>
                </ul>
            </li>
            <li>
                <a class="has-arrow" href="#">
                    Pages
                </a>
                <ul aria-expanded="true">
                    <router-link tag="li" to="/Alerts"><a>Mail Box</a></router-link>
                    <router-link tag="li" to="/Alerts"><a>Search</a></router-link>
                    <router-link tag="li" to="/Alerts"><a>FAQ</a></router-link>
                    <router-link tag="li" to="/Alerts"><a>Login</a></router-link>
                    <router-link tag="li" to="/Alerts"><a>404</a></router-link>
                    <router-link tag="li" to="/Tooltips"><a>Regist</a></router-link>
                    <router-link tag="li" to="/Alerts"><a>505</a></router-link>
                </ul>
            </li>
            <router-link tag="li" to="/About"><a>About</a></router-link>
        </ul>
    </nav>
</template>

<script>
export default {
    mounted: function () { //渲染完成
        $('#main-menu').metisMenu();
    }
}
</script>

<style scoped>

</style>