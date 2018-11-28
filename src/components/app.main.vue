<template>
    <app-tab-main v-if="useTabView"></app-tab-main>
    <div v-else class="wrapper">
        <div class="wrapper">
            <div class="page-title">
                <app-breadcrumb></app-breadcrumb>
            </div>
            <div class="page-content">
                <div class="main" ref="main">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import AppBreadcrumb from "./app.breadcrumb"
    import AppTabMain from "./app.tab.main"

    import {mapGetters} from 'vuex'

    export default {
        components: {
            AppBreadcrumb,
            AppTabMain
        },
        computed: {
            ...mapGetters("AppViewSettings", {
                useTabView: "useTabView"
            })
        }
    }
</script>
