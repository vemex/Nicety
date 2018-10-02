<template>
    <nav class="sidebar-nav">
        <div id="main-menu">
            <span class="sidebar-search-wrapper text-light" style="font-size: 14px;padding: 1rem;font-weight: 600;">
                导航
                <!-- END RESPONSIVE QUICK SEARCH FORM -->
            </span>
            <nicety-menu :mode="'inline'">
                <nicety-nav-item v-for="(route, index) in routes" v-bind:key="index"
                                 :route="route"></nicety-nav-item>
            </nicety-menu>
        </div>
    </nav>
</template>
<script>
    import NicetyOption from "./Option";
    import NicetyMenuItem from "./MenuItem";
    import NicetyNavItem from "./app.nav.item";
    import NicetyMenu from "./Menu";
    import {mapState, mapActions, mapGetters} from 'vuex'
    export default {
        name: "nicety-nav",
        components: {NicetyMenu, NicetyNavItem, NicetyMenuItem, NicetyOption},
        computed: {
            ...mapGetters('AppNav', {
                routes: 'routes',
            }),
        },
        mounted: function () {
        }
    }
</script>