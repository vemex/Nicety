<template>
    <div id="dashboard-app" class="fixed-header fixed-left-sider">
        <header>
            <div class="aside-header">
                <app-nav-header></app-nav-header>
            </div>
            <div class="header-bar">
                <app-header-bar></app-header-bar>
            </div>
        </header>
        <div class="dashboard-body">
            <div class="aside-left" id="aside_left">
                <app-nav></app-nav>
            </div>
            <main class="page">
                    <router-view></router-view>
            </main>

        </div>
    <app-footer></app-footer>
    </div>
</template>

<
<script>
    import AppFooter from "./app.footer.vue"
    import AppHeaderBar from "./app.header.bar.vue"
    import AppNavHeader from "./app.nav.header.vue"
    import AppNav from "./app.nav.vue"

    export default {
        components: {
            AppFooter,
            AppHeaderBar,
            AppNavHeader,
            AppNav
        },
        mounted: function () { //渲染完成
            $('#main-menu').metisMenu();
            $('[data-toggle="popover"]').popover({
                delay: {'show': 500, 'hide': 100},
                offset: 1
            });
            if ($('#dashboard-app').hasClass('fixed-left-sider')) {
                $('#aside_left').mCustomScrollbar({
                    theme: "minimal", scrollInertia: 50, mouseWheel: {
                        preventDefault: true
                    }
                });
            }
           // $('#dashboard-app').mCustomScrollbar({theme: "minimal-dark", scrollInertia: 50});

           // $('body').mCustomScrollbar({ theme: "minimal-dark",scrollInertia:0});
        }
    }
</script>

