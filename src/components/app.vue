<template>
    <div id="dashboard-app"
         :class="[{'fixed-left-sider':fixedAsideLeft} ,{'fixed-header': fixedHeader}  ,{'fixed-footer':fixedFooter},{'fixed-page-title':fixedPageTitle}, {'no-nav-tab':!useTabView},{'fixed-nav-tabs':fixedNavTabs&&useTabView}]">
        <header>
            <app-nav-header>
            </app-nav-header>
            <app-header-bar>
                <template slot="left">
                    <slot name="nav-header-bar-left"></slot>
                </template>
                <template slot="right">
                    <slot name="nav-header-bar-right"></slot>
                </template>
            </app-header-bar>
        </header>
        <div class="dashboard-body">
            <div class="aside-left" id="aside_left">
                <app-nav></app-nav>
            </div>
            <main class="page">
                <app-main></app-main>
            </main>

        </div>
        <app-footer></app-footer>
    </div>
</template>
<script>
import AppFooter from './app.footer';
import AppMain from './app.main';
import AppHeaderBar from './app.header.bar.vue';
import AppNavHeader from './app.nav.header.vue';
import $ from 'jquery';
import AppNav from './app.nav';
import {mapState, mapActions, mapGetters} from 'vuex';

export default {
    components: {
        AppNav,
        AppMain,
        AppFooter,
        AppHeaderBar,
        AppNavHeader,
    },
    props: {
        fixedHeader: [Boolean],
        fixedFooter: [Boolean],
        fixedAsideLeft: [Boolean],
        fixedPageTitle: [Boolean],
        fixedNavTabs: [Boolean]
    },
    computed: {
        ...mapGetters('AppViewSettings', {
            useTabView: 'useTabView'
        }),
    },
    mounted: function () {
        // 渲染完成
        $('.collapse').collapse();
        //  $('#main-menu').metisMenu();
        $('[data-toggle="popover"]').popover({
            delay: {'show': 500, 'hide': 100},
            offset: 1
        });
        if ($('#dashboard-app').hasClass('fixed-left-sider')) {
            $('#aside_left .wrapper').mCustomScrollbar({
                theme: 'minimal', scrollInertia: 50, mouseWheel: {
                    preventDefault: true
                }
            });
        }
        // $('#dashboard-app').mCustomScrollbar({theme: "minimal-dark", scrollInertia: 50});

        // $('body').mCustomScrollbar({ theme: "minimal-dark",scrollInertia:0});
    }
};
</script>
