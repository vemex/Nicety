<template>
    <nicety-submenu :class="[{'active':route.meta.active}]" :index="route.path" ref="subMenuItem"
                    v-if="hasChildren && route.meta.displayInNav && hasPermission">
        <template slot="title">
            <i :class="route.meta.icon"></i>
            <span>{{route.meta.display}}</span>
        </template>
        <template v-for="item in route.children">
            <nicety-nav-item :route="item"></nicety-nav-item>
            <!--<nicety-menu-item :index="item.path"-->
            <!--:content="item.meta.display" v-else-->
            <!--@click="itemClickHandler(item.path)">-->
            <!--<i class="nicety-icon-document"></i>-->
            <!--<span slot="title">{{item.meta.display}}</span>-->
            <!--</nicety-menu-item>-->
        </template>
    </nicety-submenu>
    <nicety-menu-item :index="route.path" :class="[{'active':route.meta.active}]" :route="routeObj" ref="menuItem"
                      v-else-if="route.meta.displayInNav && hasPermission">
        <i :class="route.meta.icon"></i>
        <span slot="title">{{route.meta.display}}</span>
    </nicety-menu-item>
</template>
<script>

    export default {
        name: 'nicety-nav-item',
        props: {
            'route': [Array, Object]
        },
        computed: {
            hasChildren: function () {
                return this.route.children !== undefined;
            },
            hasPermission: function () {
                return this.$securtyManager.checkUrl(this.route);
            },
            routeObj: function () {
                let splitByRegx = function (regex, str, result) {
                    let matches = regex.exec(str);
                    if (matches != null) {
                        result.push(matches[1])
                        splitByRegx(regex, str, result);
                    }
                }
                let parameters = [];
                splitByRegx(/\/:([a-zA-Z]*)/gi, this.route.path, parameters);
                let params = {};
                for (let i = 0; i < parameters.length; i++) {
                    params[parameters[i]] = 'none';
                }
                return {
                    name: this.route.name,
                    params
                }
            }
        },
        watch: {
            'route.meta.active': function (newValue, oldValue) {
                if (newValue && this.$refs.menuItem) {
                    this.$refs.menuItem.rootMenu.activeIndex = this.route.path;
                    this.$refs.menuItem.rootMenu.initOpenedMenu();
                }
            }
        },
        mounted: function () {
            // console.log(this.route)
        },
        methods: {
            itemClickHandler: function (path) {
                this.$router.push(path);
            }
        }
    };
</script>
