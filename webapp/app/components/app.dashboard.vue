<template>
    <div id="dashboard-app" class="fixed-header fixed-footer">
        <header></header>

        <div class="dashboard-body">
            <div class="aside-left">
                 <h1>test1</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
            </div>
            <main>
                <div class="content">
                <h1>test1</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test1</h1>
                </div>
            </main>
        </div>
           <app-footer></app-footer>
            <!--
            <nav class="sidebar-nav">
                <ul class="metismenu" id="main-menu">
                    <li>
                        <a class="has-arrow" href="#">
                            <span class="fa fa-fw fa-github fa-lg"></span> metisMenu
                        </a>
                        <ul aria-expanded="true">
                            <li>
                                <a href="https://github.com/onokumus/metisMenu">
                                    <span class="fa fa-fw fa-code-fork"></span> Fork
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/onokumus/metisMenu">
                                    <span class="fa fa-fw fa-star"></span> Star
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/onokumus/metisMenu/issues">
                                    <span class="fa fa-fw fa-exclamation-triangle"></span> Issues
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a class="has-arrow" href="#" aria-expanded="false">Menu 0</a>
                        <ul aria-expanded="false">
                            <li><a href="#">item 0.1</a></li>
                            <li><a href="#">item 0.2</a></li>
                            <li><a href="http://onokumus.com">onokumus</a></li>
                            <li><a href="#">item 0.4</a></li>
                        </ul>
                    </li>
                    <li id="removable">
                        <a class="has-arrow" href="#" aria-expanded="false">Menu 1</a>
                        <ul aria-expanded="false">
                            <li><a href="#">item 1.1</a></li>
                            <li><a href="#">item 1.2</a></li>
                            <li>
                                <a class="has-arrow" href="#" aria-expanded="false">Menu 1.3</a>
                                <ul aria-expanded="false">
                                    <li><a href="#">item 1.3.1</a></li>
                                    <li><a href="#">item 1.3.2</a></li>
                                    <li><a href="#">item 1.3.3</a></li>
                                    <li><a href="#">item 1.3.4</a></li>
                                </ul>
                            </li>
                            <li><a href="#">item 1.4</a></li>
                            <li>
                                <a class="has-arrow" href="#" aria-expanded="false">Menu 1.5</a>
                                <ul aria-expanded="false">
                                    <li><a href="#">item 1.5.1</a></li>
                                    <li><a href="#">item 1.5.2</a></li>
                                    <li><a href="#">item 1.5.3</a></li>
                                    <li><a href="#">item 1.5.4</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a class="has-arrow" href="#" aria-expanded="false">Menu 2</a>
                        <ul aria-expanded="false">
                            <li><a href="#">item 2.1</a></li>
                            <li><a href="#">item 2.2</a></li>
                            <li><a href="#">item 2.3</a></li>
                            <li><a href="#">item 2.4</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <main role="main" class="app-body">
                <div>dashboard</div>
                <div class="container">
                    <router-view></router-view>
                    <app-footer></app-footer>
                </div>
            </main>
        </div>-->
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
        }
    }
</script>

