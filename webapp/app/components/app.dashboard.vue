<template>
    <div id="dashboard-app" class="fixed-left-sider fixed-header fixed-footer"><!--fixed-left-sider fixed-header fixed-footer-->
  
     <div>
        <header> 
            <div class="aside-header">
                <label class="text-light text-lg-center">Nicety</label>
                <button type="button" class="sidebar-toggler "><i class="pli-view-list"></i></button>

            </div>
            <div class="header-bar">
                <div>


                
                    <div class="dropdown">
                        <button class="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="pli-bell" ></i><span class="badge">4</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 29px, 0px); top: 0px; left: 0px; will-change: transform;">
                            <form class="px-4 py-3">
                                <div class="form-group">
                                    <label for="exampleDropdownFormEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com">
                                </div>
                                <div class="form-group">
                                    <label for="exampleDropdownFormPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password">
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="dropdownCheck">
                                    <label class="form-check-label" for="dropdownCheck">
                                        Remember me
                                    </label>
                                </div>
                                <button type="submit" class="btn btn-primary">Sign in</button>
                            </form>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">New around here? Sign up</a>
                            <a class="dropdown-item" href="#">Forgot password?</a>
                        </div>
                    </div>
                        <button type="button" data-container="body" data-toggle="popover"  data-trigger="hover"  data-placement="bottom" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                        <i class="pli-mail-2"></i>
                    </button>
                    <button type="button"  data-container="body" data-toggle="popover" data-trigger="hover"   data-placement="bottom" data-content="退出">
                        <i class="pli-unlock"></i>
                    </button>
                </div>

            </div> 
        </header>

        <div class="dashboard-body"> 
            
            <div class="aside-left" id="aside_left">
                <nav class="sidebar-nav">
                    <ul class="metismenu" id="main-menu">
                        <li class="sidebar-search-wrapper">
                            展示
                            <!-- END RESPONSIVE QUICK SEARCH FORM -->
                        </li>
                        <router-link tag="li" to="/Home"><a>Home</a></router-link>

                        <router-link  tag="li" to="/ThemeColor"><a>ThemeColor</a></router-link>
                        <li>
                            <a class="has-arrow" href="#">
                               <i class="pli-folder"></i> Layout
                            </a>
                            <ul aria-expanded="true">
                                <router-link  tag="li" to="/Grid"><a>Grid</a></router-link>
                                <router-link tag="li" to="/Flex"><a>Flex</a></router-link>
                                <router-link tag="li"  to="/Display"><a>Display</a></router-link>
                            </ul>
                        </li>
                        <li >
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
                        <li >
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
                            <a  class="has-arrow" href="#">
                                Plugins
                            </a>
                            <ul aria-expanded="true">
                                <router-link tag="li"  to="/Metismenu"><a>Menu</a></router-link>
                                <router-link tag="li"  to="/AgGrid"><a>AgGrid</a></router-link>
                                <router-link tag="li"  to="/Alerts"><a>Tabs</a></router-link>
                                <router-link tag="li"  to="/ECharts"><a>Charts</a></router-link>
                            </ul>
                        </li>
                        <router-link tag="li" to="/UtilsDemo"><a class="nav-link">Utils</a></router-link>
                        <router-link tag="li" to="/Navbar"><a class="nav-link">Widgets</a></router-link>
                        <li>
                            <a  class="has-arrow" href="#">
                                Icons
                            </a>
                            <ul aria-expanded="true">
                                <router-link tag="li"  to="/IconsThemify"><a>Icons Themify</a></router-link>
                                <router-link tag="li"  to="/PremiumLine"><a>Icons Premium Line</a></router-link>
                                <router-link tag="li"  to="/PremiumSolid"><a>Icons Premium Solid</a></router-link>
                            </ul>
                        </li>
                        <li>
                            <a class="has-arrow" href="#">
                                Pages
                            </a>
                            <ul aria-expanded="true">
                                <router-link tag="li"  to="/Alerts"><a>Mail Box</a></router-link>
                                <router-link tag="li"  to="/Alerts"><a>Search</a></router-link>
                                <router-link tag="li"  to="/Alerts"><a>FAQ</a></router-link>
                                <router-link tag="li"  to="/Alerts"><a>Login</a></router-link>
                                <router-link tag="li"  to="/Alerts"><a>404</a></router-link>
                                <router-link tag="li"  to="/Tooltips"><a>Regist</a></router-link>
                                <router-link tag="li"  to="/Alerts"><a>505</a></router-link>
                            </ul>
                        </li>
                        <router-link tag="li" to="/About"><a>About</a></router-link>
                    </ul>
                </nav>
            </div>

            <main> 
                    <div class="content">
                        <router-view></router-view>
                    </div> 
            </main> 
        </div>
           <app-footer></app-footer>
            <!--

            <main role="main" class="app-body">
                <div>dashboard</div>
                <div class="container">
                    <router-view></router-view>
                    <app-footer></app-footer>
                </div>
            </main>
        </div>-->
     </div>
    </div>
</template>

<<script>
    import AppFooter from "./footer.vue"
    export default {
        components: {
            AppFooter
        },
        mounted: function() { //渲染完成
            $('#main-menu').metisMenu();
            $('[data-toggle="popover"]').popover({
                delay:{ 'show': 500, 'hide': 100 },
                offset:1
            });
            if ($('#dashboard-app').hasClass('fixed-left-sider')) { 
                $('#aside_left').mCustomScrollbar({ theme: "minimal",scrollInertia:50,mouseWheel:{ preventDefault: true
                }});
            }
            $('#dashboard-app').mCustomScrollbar({ theme: "minimal-dark",scrollInertia:50});

            //$(body).mCustomScrollbar({ theme: "minimal-dark",scrollInertia:50}); 
        }
    }
</script>

