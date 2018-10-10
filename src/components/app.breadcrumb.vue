<template>
    <ol class="breadcrumb">
        导航：
        <li class="breadcrumb-item" v-for="(item) in breadlist" >
            <router-link :to="item.path">{{$t('router.'+item.name)}}</router-link>
        </li>
    </ol>
</template>
<script>
    import { mapState } from 'vuex'

    export default{
        computed: mapState({
            breadlist: state => state.AppBreadcrumb.Breadlist
        }),
        created() {
            this.$store.dispatch('AppBreadcrumb/updateBreadListState',{
                route:this.$router.currentRoute,
                isreload:true

            })//刷新的参数为true
        },

        methods: {

        },
        watch: {
            $route () {
                this.$store.dispatch('AppBreadcrumb/updateBreadListState',{
                    route:this.$router.currentRoute,
                    isreload:false

                })
            }
        },
    }
</script>