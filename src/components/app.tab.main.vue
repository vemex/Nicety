<template>
    <div class="wrapper">
        <ul class="nav nav-tabs">
            <li class="nav-item" v-for="item in openTabs">
                <div :class="['nav-link' ,{'active':item.active}]" @click.stop="activeTab(item.url)"
                     @mouseup="mouseWheelClick(item,arguments)">
                    <span>{{item.display}}</span>
                    <i v-show="item.canClose" @click.stop="closeTabHandler(item.url)"
                       class="close-tab fa fa-times ml-1"></i>
                </div>

            </li>
        </ul>
        <div class="wrapper">
            <div class="page-title">
                <app-breadcrumb></app-breadcrumb>
            </div>
            <div class="page-content">
                <nav class="tool-bar">
                    <ul class="wrapper">
                        <li class="">
                            <button class="btn">
                                <i class="pli-mail-2"></i>
                                Save
                            </button>
                        </li>
                        <li><a href="#" class="nav-link">Link</a></li>
                        <li class="dropdown"><a href="#" id="navbarDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false" class="nav-link dropdown-toggle">
                            Dropdown
                        </a>
                            <div aria-labelledby="navbarDropdown" class="dropdown-menu"><a href="#"
                                                                                           class="dropdown-item">Action</a>
                                <a href="#" class="dropdown-item">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item">Something else here</a></div>
                        </li>
                        <li class=""><a href="#" class="nav-link disabled">Disabled</a></li>
                    </ul>

                </nav>
                <div class="main">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import AppBreadcrumb from "./app.breadcrumb"

    import {mapState, mapActions, mapGetters} from 'vuex'

    export default {
        components: {
            AppBreadcrumb
        },
        computed: {
            ...mapGetters('AppNav', {
                openTabs: 'openTabs',
                activePath: 'activePath',
            }),
        },
        watch: {
            activePath: function (v) {
                this.$router.push({path: v});
            }
        },
        methods: {
            mouseWheelClick(tabInfo, args) {
                let event = args[0];
                if (event.button === 1 && tabInfo.canClose) {
                    this.closeTabHandler(tabInfo.url);
                }
            },
            activeTab(url) {
                this.$router.push(url);
            },
            closeTabHandler: function (url) {
                this.$store.dispatch("AppNav/closeTab", url);

            }
        }
    }
</script>