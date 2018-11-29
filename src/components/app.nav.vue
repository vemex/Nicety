<template>
    <div class="wrapper">
        <nav class="sidebar-nav">
            <div id="main-menu">
            <span class="sidebar-search-wrapper text-light" style="font-size: 14px;padding: 1rem;font-weight: 600;">
                导航
                <!-- END RESPONSIVE QUICK SEARCH FORM -->
            </span>
                <nicety-menu :router="true" :unique-opened="true">
                    <template v-for="(route, index) in routes">
                        <nicety-nav-item v-bind:key="index" v-if="checkRole(route.meta.role)"
                                         :route="route"></nicety-nav-item>
                    </template>
                </nicety-menu>
            </div>
        </nav>
    </div>
</template>
<script>
// import NicetyOption from './Option';
// import NicetyMenuItem from './MenuItem';
import NicetyNavItem from './app.nav.item';
// import NicetyMenu from './Menu';
import {mapState, mapActions, mapGetters} from 'vuex';

export default {
    name: 'nicety-nav',
    components: {NicetyNavItem},
    computed: {
        ...mapGetters('AppNav', {
            routes: 'routes'
        })
    },
    data: function () {
        return {
            activeIndex: '/'
        };
    },
    watch: {
        routes: function (a, b) {
        }
    },
    mounted: function () {
    },
    methods: {
        checkRole (role) {
            // todo 抽象角色检查服务有外部注入判断
            if (role === undefined) {
                return true;
            }
            if (this.$store.getters['User/currentUser'] !== undefined) {
                return this.$store.getters['User/currentUser'].account === role;
            }
            return false;
        }
    }
};
</script>
