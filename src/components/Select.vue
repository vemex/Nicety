<template>
    <div :class="['nicety select', {'active': visible, 'multiple': multiple, 'disabled': disabled, 'search': search}]"
         @click="clickHandler"
         @mouseover="mouseOverHandler"
         @mouseout="mouseOutHandler"
         v-clickoutside="awayHandler">
        <template v-if="multiple">
            <i :class="iconDownArrow" v-if="!searchIsFunction"></i>
            <i :class="iconSearch" v-if="searchIsFunction"></i>
            <a class="tag" @click.stop="() => {}"
               v-for="(item, index) in values" :key="index">
                {{ item.itemDisplay }}
                <i :class="iconClose" @click.stop="closeItemHandler(index, item, $event)"></i>
            </a>
            <input autocomplete="off" ref="inputSearch" v-if="search"
                   @input.stop="searchInputHandler($event.target.value)"
                   @keyup.up.stop="keyUpHandler"
                   @keyup.down.stop="keyDownHandler"
                   @keyup.enter.stop="keyEnterHandler"
                   @keydown.delete.stop="keyDeleteHandler"
                   @focus="visible = true"
                   :style="{'width': `${multipleInputWidth}em`}"
            />
            <div class="text hint" v-html="hint" :style="{visibility: valueEmpty && !visible ? 'visible' : 'hidden'}"
                 v-if="values.length <= 0"></div>
        </template>
        <template v-else>
            <i :class="iconCloseCircle" v-if="showClear && !valueEmpty" style="opacity: .6;"
               @click.stop="clearHandler"></i>
            <i :class="iconDownArrow" v-else-if="!searchIsFunction"></i>
            <i :class="iconSearch" v-else-if="searchIsFunction"></i>
            <input autocomplete="off" ref="inputSearch" v-if="search"
                   @input.stop="searchInputHandler($event.target.value)"
                   @keyup.up.stop="keyUpHandler"
                   @keyup.down.stop="keyDownHandler"
                   @keyup.enter.stop="keyEnterHandler"/>
            <div :class="['text', {'hint': valueEmpty}]" :style="{visibility: showText ? 'visible' : 'hidden'}">
                {{ values.length > 0 && values[0].itemDisplay || hint }}
            </div>
        </template>
        <ul class="nicety menu" v-show="visible" v-if="$slots.default"
            @click.stop="menuClickHandler($event)"
            @mouseover.stop="() => {}"
            @mouseout.stop="() => {}">
            <slot></slot>
        </ul>
        <ul class="nicety menu" v-show="visible" v-else-if="hasSource"
            @click.stop="menuClickHandler($event)"
            @mouseover.stop="() => {}"
            @mouseout.stop="() => {}">
            <template v-for="item in items">
                <nicety-option :itemKey="item[itemKeyFiled]" :itemDisplay="item[itemDisplayFiled]" :data="item">
                </nicety-option>
            </template>
        </ul>
    </div>
</template>
<script>
    import clickoutside from '../directives/clickoutside'
    import {notify} from '../config'
    import NicetyOption from "./Option.vue"


    export default {
        name: 'nicety-select',
        components: {NicetyOption},
        directives: {clickoutside},
        props: {
            value: [Number, String, Array,Object],//v-model 单选时为单值，多选时为数组   存入itemkey值
            itemKeyFiled: {type: String, default: 'itemKey'}, //当设置ItemSource时，数据主键值
            itemDisplayFiled: {type: String, default: 'itemDisplay'},  //当设置ItemSource时，数据显示值
            itemsSource: {type: [Array, Function], default: undefined}, // 列表项的数据源
            hint: {type: String, default: 'Please select'},//未选择任何选项时的显示说明
            multiple: {type: Boolean, default: false},//是否为多选
            search: {type: [Boolean, Function], default: false}, //是否可以搜索
            disabled: {type: Boolean, default: false},//是否启用
            canAdd: {type: Boolean, default: false},//是否可以将输入项添加为新项
            iconDownArrow: {type: String, default: 'fa fa-angle-down'},
            iconClose: {type: String, default: 'fa fa-close'},
            iconCloseCircle: {type: String, default: 'fa fa-times-circle'},
            iconSearch: {type: String, default: 'fa fa-search'}
        },
        data() {
            return {
                visible: false,
                items: [],//列表项
                //selectedItems: [], //选择项
                showText: true,
                reRenderChildren: false,
                showClear: false,//是否显示清除
                multipleInputWidth: 1,
                displayItems: [], // 列表显示项 对应 显示列表的children
                keyChildrenIndex: -1 // 子元素的索引,键盘上下操作
            }
        },
        created() {
            if (this.hasSource) {
                if (this.sourceIsFunction) {
                    this.items = this.itemsSource.apply(this)
                } else {
                    this.items = this.itemsSource;
                }
            }
        },
        mounted() {
            this.initData()
        },
        watch: {
            displayItems: {//监视显示项的变化
                handler: function (newValue, oldValue) {
                    if (this.searchIsFunction) {
                        newValue.forEach((ele) => {
                            ele.$el.style.display = 'block';
                            ele.active = !!this.values.find((value) => ele.itemKey === value.itemKey);
                        });
                    }
                },
            },
        },
        computed: {
            valueEmpty() {
                return this.values.length === 0
            },
            currentItem() {
                if (this.keyChildrenIndex === -1) {
                    return this.displayItems[0]
                }
                return this.displayItems[this.keyChildrenIndex]
            },
            searchIsFunction() {
                return this.search && this.search instanceof Function
            },
            sourceIsFunction() {
                return this.itemsSource && this.itemsSource instanceof Function
            },
            hasSource() {
                return this.itemsSource instanceof Function || this.itemsSource instanceof Array;
            },
            values() {
                return Array.isArray(this.value) ? this.value : (this.value && this.value.toString() !== '' ? [this.value] : [])
            }
        },
        methods: {
            getItem(key) {//根据key查询数据项
                if (this.items.get instanceof Function) {
                    return this.items.get(key);
                }
                if (this.items instanceof Array) {
                    let item = this.items.find((ele) => {
                        return (ele.index === value)
                    });
                    return new Promise(function (resolve, reject) {
                        resolve(item);
                    });
                }
            },

            initData() {
                //this.selectedItems = [];
                this.$children.forEach((ele) => {
                    ele.$el.style.display = 'block';
                    ele.active = !!this.values.find((value) => ele.itemKey === value.itemKey);
                });
                this.displayItems = this.$children
            },
            searchInputHandler(v) {//键入值搜索
                if (this.searchIsFunction) {
                    this.search(v);
                    this.$nextTick(() => {
                        this.displayItems = this.$children;
                    })
                }
                if (!/^\s+$/.test(v)) {
                    this.displayItems = [];
                    this.$children.forEach((ele) => {
                        if (ele.itemDisplay.toLowerCase().startsWith(v.toLowerCase())) {
                            ele.$el.style.display = 'block';
                            this.displayItems.push(ele)
                        } else {
                            ele.$el.style.display = 'none'
                        }
                    });
                    this.keyChildrenIndex = -1;
                    this.showText = false;
                    this.multipleInputWidth = v.length > 0 ? v.length : 1
                } else {
                    this.showText = true;
                    this.displayItems = this.$children;
                    this.multipleInputWidth = 1
                }
            },
            keyUpHandler() {//方向键上处理
                let dLength = this.displayItems.length;
                if (dLength <= 0) return;
                if (!this.values.includes(this.currentItem.index)) {
                    this.currentItem.active = false
                }
                if (this.keyChildrenIndex <= 0) {
                    this.keyChildrenIndex = dLength - 1
                } else {
                    this.keyChildrenIndex--
                }
                this.currentItem.active = true
            },
            keyDownHandler() {//方向键下处理
                let dLength = this.displayItems.length;
                // console.log(dLength, ':::', this.keyChildrenIndex)
                if (dLength <= 0) return;
                if (!this.values.includes(this.currentItem.index)) {
                    this.currentItem.active = false
                }
                if (this.keyChildrenIndex >= dLength - 1) {
                    this.keyChildrenIndex = 0
                } else {
                    this.keyChildrenIndex++
                }
                this.currentItem.active = true
            },
            keyEnterHandler(evt) {//回车键处理
                if (evt.shiftKey){
                    this.$emit('addTag', this.$refs.inputSearch.value);
                    this.resetValues();
                    return;
                }
                //if (this.displayItems.length <= 0) return;
                if (this.currentItem !== undefined && !this.values.includes(this.currentItem.index)) {
                    this.currentItem.active = false;
                    this.changeHandler(this.currentItem)
                } else {
                    this.$emit('addTag', this.$refs.inputSearch.value);
                    this.resetValues();
                }
                this.displayItems = this.$children;
                this.multipleInputWidth = 1
                // if (this.search) this.$refs.inputSearch.blur()
            },
            mouseOverHandler() {//鼠标移入处理
                this.showClear = true
            },
            mouseOutHandler() {//鼠标移出处理
                this.showClear = false
            },
            keyDeleteHandler(evt) {//删除键处理
                if (this.$refs.inputSearch.value === '') {
                    let index = this.values.length - 1;
                    this.closeItemHandler(index, this.values[index]);
                    let input = this.$refs.inputSearch;
                    setTimeout(function () {
                        input.focus()
                    }, 50)
                }
            },
            closeItemHandler(index, item, evt) { // 关闭项,针对多选
                if (index < 0) {
                    return;
                }
                this.values.splice(index, 1);
                this.$children.forEach((e) => {
                    if (e.itemKey === item.itemKey) {
                        e.active = false
                    }
                });
                this.emitChange(this.values);
                this.resetValues()
            },
            clearHandler() { // 清除项，针对单选
                this.values = [];
                this.awayHandler();
                this.emitChange([])
            },
            clickHandler() {
                this.visible = !this.visible;
                if (this.search) this.$refs.inputSearch.focus()
            },
            menuClickHandler(evt) {//下拉列表项点击处理
                if (evt.target.nodeName.toLocaleUpperCase()==="LI") {
                    this.changeHandler(evt.target.__vue__)
                }
            },
            changeHandler(vt) {//选择改变处理
                // console.log(this.multiple, '::', vt.index)

                let data=vt.data===undefined?{itemKey:vt.itemKey,itemDisplay:vt.itemDisplay}:vt.data;
                if (this.multiple) {//多选时处理
                    // console.log('value:', this.value, vt.active, this.selectedItems)
                    // let nValue = Array.from(this.values);
                    if (vt.active) {
                        vt.active = false;


                        this.removeSelectItem(data);
                    } else {
                        vt.active = true;
                        this.pushSelectItem(data);
                    }
                    this.emitChange(this.values);
                    this.resetValues()
                } else {//单选时处理
                    let currentData=this.currentItem.data===undefined?{itemKey:this.currentItem.itemKey,itemDisplay:this.currentItem.itemDisplay}:this.currentItem.data;
                    this.removeSelectItem(currentData);
                    this.pushSelectItem(data);
                    this.emitChange([data]);
                    this.awayHandler()
                }
            },
            pushSelectItem(item) { //添加选择项
                let selectItem = {itemKey: item[this.itemKeyFiled], itemDisplay: item[this.itemDisplayFiled], data: item};
                if (this.multiple) {
                    let key = item[this.itemKeyFiled];
                    let findItem = this.values.find(function (value) {
                        return value.itemKey === key;
                    });
                    if (!findItem) {
                        this.values.push(selectItem);
                    }
                } else {
                    this.values.splice(0, 1, selectItem);
                }
            },
            removeSelectItem(item) { //移除选择项
                if (this.multiple) {
                    let key = item[this.itemKeyFiled];
                    let findItem = this.values.find(function (value) {
                        return value.itemKey === key;
                    });
                    let findIndex = this.values.indexOf(findItem);
                    this.values.splice(findIndex, 1);
                } else {//如果非多选，则删除所有
                    this.values.splice(0);
                }
            },
            emitChange(values) {//触发选择项改变事件
                let v = this.multiple ? values : values[0];
                this.$emit('input', v);
                this.$emit('change', v);
                notify.field.change(this)
            },
            awayHandler() {
                this.visible = false;
                this.resetValues()
            },
            resetValues() {//重置值
                this.showText = true;
                this.reRenderChildren = true;
                this.keyChildrenIndex = -1;
                // 选择之后clear input search
                if (this.search) {
                    this.$refs.inputSearch.value = ''
                }
            }
        }
    }
</script>