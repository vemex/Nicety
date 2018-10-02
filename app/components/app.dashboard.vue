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
            <div class="aside-left collapse" id="aside_left">
                <nicety-nav></nicety-nav>
            </div>
            <main class="page">
                <app-main></app-main>

            </main>

        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppFooter from "./app.footer.vue"
    import AppMain from "../../src/components/app.tab.main"
    import AppHeaderBar from "./app.header.bar.vue"
    import AppNavHeader from "./app.nav.header.vue"
    import AppNav from "./app.nav.vue"
    import $ from 'jquery'
    import NicetyNavItem from "../../src/components/app.nav.item";
    import NicetyNav from "../../src/components/app.nav";

    export default {
        components: {
            NicetyNav,
            NicetyNavItem,
            AppMain,
            AppFooter,
            AppHeaderBar,
            AppNavHeader,
            AppNav,
        },
        mounted: function () { //渲染完成

            $('.collapse').collapse();
            //  $('#main-menu').metisMenu();
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

