<template>
    <div class="wrapper">
        <nav class="sidebar-nav">
            <div id="main-menu">
                <nicety-menu :router="true" :unique-opened="true">
                    <template v-for="(route, index) in routes">
                        <nicety-nav-item v-bind:key="index"
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

            return false;
        }
    }
};
</script>
