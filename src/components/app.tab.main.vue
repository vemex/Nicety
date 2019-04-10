<template>
    <div class="wrapper">
        <nicety-scrollbar ref="scrollbar" class="header-tab" tag="div">
            <ul ref="nav_ul" class="nav nav-tabs">
                <li class="nav-item" v-for="item in openTabs">
                    <div :class="['nav-link' ,{'active':item.active}]" @click.stop="activeTab(item.url)"
                         @mouseup="mouseWheelClick(item,arguments)">
                        <span>{{item.display}}</span>
                        <i v-show="item.canClose" @click.stop="closeTabHandler(item.url)"
                           class="close-tab fa fa-times ml-1"></i>
                    </div>
                </li>
            </ul>
        </nicety-scrollbar>
        <div class="main" style="height: 100%;padding: 1rem;overflow: auto">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import AppBreadcrumb from './app.breadcrumb';

    import {mapState, mapActions, mapGetters} from 'vuex';

    export default {
        components: {
            AppBreadcrumb
        },
        computed: {
            ...mapGetters('AppNav', {
                openTabs: 'openTabs',
                activePath: 'activePath'
            })
        },
        watch: {
            openTabs: function (v) {
                // this.$router.push({path: v});
                this.$nextTick(function () {
                    let scrollWidth = this.$refs.scrollbar.$el.getBoundingClientRect().width;
                    let childrenWidth = 0;

                    for (let item of this.$refs.nav_ul.children) {
                        childrenWidth += item.getBoundingClientRect().width
                    }

                    if (scrollWidth < childrenWidth) {
                        this.$refs.nav_ul.style.width = childrenWidth + "px";
                    } else {
                        this.$refs.nav_ul.style.width = scrollWidth + "px";
                    }
                    this.$refs.scrollbar.update();
                });
            },
            activePath: function (y) {
                this.$nextTick(function () {
                        let scrollRect = this.$refs.scrollbar.$el.getBoundingClientRect();
                        let activeLiEl = this.$refs.nav_ul.querySelector('li div.active').parentElement;
                        let activeRect = activeLiEl.getBoundingClientRect();
                        let wrap = this.$refs.scrollbar.wrap;

                        if (activeRect.x + activeRect.width > scrollRect.x + scrollRect.width) {
                            this.$refs.scrollbar.scrollX(wrap.scrollLeft + (activeRect.x + activeRect.width - (scrollRect.x + scrollRect.width)));
                        }
                        if (activeRect.x < scrollRect.x) {
                            this.$refs.scrollbar.scrollX(wrap.scrollLeft + (activeRect.x - scrollRect.x));
                        }
                    }
                )
                ;
            }
        },
        methods: {
            mouseWheelClick(tabInfo, args) {
                let event = args[0];
                if (event.button === 1 && tabInfo.canClose) {
                    this.closeTabHandler(tabInfo.url);
                }
            }
            ,
            activeTab(url) {
                this.$router.push(url);
            }
            ,
            closeTabHandler: function (url) {
                let _ = this;
                this.$store.dispatch('AppNav/closeTab', url).then(function (url) {
                    _.$router.push(url)
                });
            }
        }
    }
    ;
</script>
