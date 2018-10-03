<template>
    <div class="aside-header">
        <label class="text-light text-lg-center p-2">
           <h2>{{siteName}}</h2>
        </label>
        <!--<button type="button" id="sidebar_toggler" class="sidebar-toggler " data-toggle="aside_left"  role="button" aria-expanded="false" aria-controls="multiCollapseExample1">-->
        <!--<i class="pli-view-list"></i>-->
        <!--</button>-->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            //   MainLayout
            ...mapGetters("AppConstants", {
                siteName: "siteName",
            })
        },
    }
</script>

<style scoped>

</style>