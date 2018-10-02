<template>
    <li :class="['item submenu', {'active': this.active}]"
        @mouseover="mouseOverHandler"
        @mouseout="mouseOutHandler"
        @click="clickHandler"
        v-clickoutside="awayHandler" ref="submenu">
        <div class="title" ref="subtitle">
            <slot name="title"></slot>
        </div>
        <collapse-transition>
            <ul :class="['nicety menu', this.mode]" v-show="visible"><slot></slot></ul>
        </collapse-transition>
    </li>
</template>
<script>
    import clickoutside from '../directives/clickoutside'
    import CollapseTransition from "../transitions/collapse"
    export default {
        components:{
            CollapseTransition
        },

        directives: { clickoutside },
        name: 'nicety-menu-item',
        props: {
            trigger: { type: String, default: 'hover' },//可选 hover  click
            index: { type: String },//唯一索引
            indexDelimiter: { type: String, default: '-' }, // option index内容的分隔符
            mode: { type: String, default: 'vertical' }//可选 inline,vertical,horizontal
        },
        data () {
            return {
                items: {},
                visible: false,
                timeout: null,
                active: false // 针对根节点 li
            }
        },
        mounted () {
            this.items = {};
            // this.$children.forEach((ele) => {
            //     if (ele._isVue) this.items[ele.index.split(this.indexDelimiter).pop()] = ele
            // });
            // 设置children padding left
            if (this.mode !== 'inline') return;
            // this.$children.forEach((ele) => {
            //     if (ele.$el.className.indexOf('submenu') === -1) {
            //         let indexes = ele.index.split(this.indexDelimiter)
            //         ele.$el.style.paddingLeft = `${0.75 * (indexes.length)}em`
            //     }
            // });
            // set subtitle padding left
            // let indexes = this.indexes
            // this.$refs.subtitle.style.paddingLeft = `${0.75 * (indexes.length)}em`
        },
        computed: {
            // indexes () {
            //     return this.index.split(this.indexDelimiter)
            // }
        },
        methods: {
            mouseOverHandler () {
                // console.log('::::')
                if (this.mode !== 'inline' && this.trigger === 'hover') {
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        this.visible = true
                    }, 250)
                }
            },
            mouseOutHandler () {
                // console.log('>>>>>>>>>>>.')
                if (this.mode !== 'inline' && this.trigger === 'hover') {
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        this.visible = false
                    }, 150)
                }
            },
            clickHandler (evt) {
                // console.log(this.trigger, ':::', this.mode)
                if (this.mode === 'inline') {
                    if (evt.target.parentNode === this.$refs.submenu) {
                        this.visible = !this.visible
                        this.active = !this.active
                    }
                } else {
                    this.visible = !this.visible
                }
            },
            awayHandler () {
                if (this.mode !== 'inline' && this.trigger === 'click') {
                    this.visible = false
                }
            }
        }
    }
</script>