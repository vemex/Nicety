<template>
    <nicety-menu-item :class="[{'active':route.meta.active}]" :index="route.path"
                      v-if="route.children&& route.meta.displayInNav"
                      :trigger="'click'" :mode="'inline'">
        <template slot="title">{{route.meta.display}}</template>
        <template v-for="item in route.children">
            <nicety-nav-item :route="item" v-if="item.children"></nicety-nav-item>
            <nicety-option :class="[{'active':item.meta.active}]" :index="item.path"
                           :content="item.meta.display" v-else
                           @click="itemClickHandler(item.path)"></nicety-option>
        </template>
    </nicety-menu-item>
    <nicety-option :class="[{'active':route.meta.active}]" :index="route.path" :content="route.meta.display"
                   v-else-if="route.meta.displayInNav" @click="itemClickHandler(route.path)"></nicety-option>
</template>
<script>
    import NicetyMenuItem from "./MenuItem"
    import NicetyOption from "./Option";

    export default {
        name: 'nicety-nav-item',
        components: {NicetyOption, NicetyMenuItem},
        props: {
            "route": [Number, String, Array, Object]
        },
        watch: {
            route: function () {
                console.log(this.route);
            }
        },
        mounted: function () {
            //console.log(this.route)
        },
        methods: {
            itemClickHandler: function (path) {
                this.$router.push(path);
            }
        }
    }
</script>