<template>
    <div :class="[
    type === 'textarea' ? 'el-textarea' : 'nicety-input',
    inputSizeClass,
    {
      'is-disabled': inputDisabled,
      'input-group': $slots.append || $slots.prepend,
      'nicety-input--prefix': $slots.prefix || prefixIcon,
      'nicety-input--suffix': $slots.suffix || suffixIcon || clearable
    }
    ]" v-if="visible"
         @mouseenter="hovering = true"
         @mouseleave="hovering = false"
    >
        <template v-if="type !== 'textarea'">
            <!-- 前置元素 -->
            <div class="input-group-prepend" v-if="$slots.prepend">
                <span class="input-group-text"><slot name="prepend"></slot></span>

            </div>
            <input
                    :tabindex="tabindex"
                    v-if="type !== 'textarea'"
                    class="form-control"
                    v-bind="$attrs"
                    :type="type"
                    :disabled="inputDisabled"
                    :readonly="readonly"
                    :autocomplete="autocomplete"
                    :value="nativeInputValue"
                    ref="input"
                    @compositionstart="handleComposition"
                    @compositionupdate="handleComposition"
                    @compositionend="handleComposition"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                    :aria-label="label"
            >
            <!-- 前置内容 -->
            <span class="nicety-input__prefix" v-if="$slots.prefix || prefixIcon">
                <slot name="prefix"></slot>
                <i class="nicety-input__icon" v-if="prefixIcon" :class="prefixIcon"></i>
            </span>
            <!-- 后置内容 -->
            <span class="nicety-input__suffix"
                  v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon">
                <span class="nicety-input__suffix-inner">
                    <template v-if="!showClear">
                        <slot name="suffix"></slot>
                        <i class="nicety-input__icon" v-if="suffixIcon" :class="suffixIcon"></i>
                    </template>
                    <i v-else class="nicety-input__icon nicety-icon-circle-close nicety-input__clear" @click="clear"></i>
                </span>
                <i class="nicety-input__icon" v-if="validateState" :class="['nicety-input__validateIcon', validateIcon]">
                </i>
            </span>
            <!-- 后置元素 -->
            <div class="input-group-append" v-if="$slots.append">
                <span class="input-group-text">
                    <slot name="append"></slot>
                </span>
            </div>
        </template>
        <textarea
                v-else
                :tabindex="tabindex"
                class="nicety-textarea__inner"
                :value="nativeInputValue"
                @compositionstart="handleComposition"
                @compositionupdate="handleComposition"
                @compositionend="handleComposition"
                @input="handleInput"
                ref="textarea"
                v-bind="$attrs"
                :disabled="inputDisabled"
                :readonly="readonly"
                :autocomplete="autocomplete"
                :style="textareaStyle"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                :aria-label="label"
        >
    </textarea>
    </div>
</template>
<script>
import emitter from '../../mixins/emitter';
import Migrating from '../../mixins/migrating';
import calcTextareaHeight from './calcTextareaHeight';
import merge from '../../utils/merge';

export default {
    name: 'NicetyBaseInput',

    componentName: 'NicetyBaseInput',

    mixins: [emitter, Migrating],

    inheritAttrs: false,

    inject: {
        'nicetyForm': {
            default: ''
        },
        'nicetyFiled': {
            default: ''
        }
    },
    $_veeValidate: {
        name: function () {
            return this.nicetyFiled.name;
        },
        value: function () {
            return this.value;
        }
    },
    data () {
        return {
            textareaCalcStyle: {},
            hovering: false,
            focused: false,
            isOnComposition: false
        };
    },
    props: {
        value: [String, Number],
        size: String,
        resize: String,
        form: String,
        disabled: Boolean,
        readonly: Boolean,
        type: {
            type: String,
            default: 'text'
        },
        autosize: {
            type: [Boolean, Object],
            default: false
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        validateEvent: {
            type: Boolean,
            default: true
        },
        suffixIcon: String,
        prefixIcon: String,
        label: String,
        clearable: {
            type: Boolean,
            default: false
        },
        tabindex: String,
        visible:{
            type:Boolean,
            default:true,
        }
    },
    computed: {
        _nicetyFiledSize () {
            return (this.nicetyFiled || {}).nicetyFiledSize;
        },
        validateState () {
            return this.nicetyFiled ? this.nicetyFiled.validateState : '';
        },
        needStatusIcon () {
            return this.nicetyForm ? this.nicetyForm.statusIcon : false;
        },
        validateIcon () {
            return {
                validating: 'nicety-icon-loading',
                success: 'nicety-icon-circle-check',
                error: 'nicety-icon-circle-close'
            }[this.validateState];
        },
        textareaStyle () {
            return merge({}, this.textareaCalcStyle, {resize: this.resize});
        },
        inputSizeClass () {
            let size = this.size || this._nicetyFiledSize || (this.$ELEMENT || {}).size;
            if (!size || size === 'small') {
                return '';
            }
            if (size === 'medium') {
                return 'input-group-lg';
            }
            if (size === 'mini') {
                return 'input-group-sm';
            }
        },
        inputDisabled () {
            return this.disabled || (this.nicetyForm || {}).disabled;
        },
        nativeInputValue () {
            return this.value === null || this.value === undefined ? '' : this.value;
        },
        showClear () {
            return this.clearable &&
                    !this.inputDisabled &&
                    !this.readonly &&
                    this.nativeInputValue &&
                    (this.focused || this.hovering);
        }
    },

    watch: {
        value (val) {
            this.$nextTick(this.resizeTextarea);
            if (this.validateEvent) {
                this.dispatch('NicetyFiled', 'nicety.form.change', [val]);
            }
        }
    },

    methods: {
        focus () {
            (this.$refs.input || this.$refs.textarea).focus();
        },
        blur () {
            (this.$refs.input || this.$refs.textarea).blur();
        },
        getMigratingConfig () {
            return {
                props: {
                    'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
                    'on-icon-click': 'on-icon-click is removed.'
                },
                events: {
                    'click': 'click is removed.'
                }
            };
        },
        handleBlur (event) {
            this.focused = false;
            this.$emit('blur', event);
            if (this.validateEvent) {
                this.dispatch('NicetyFiled', 'el.form.blur', [this.value]);
            }
        },
        select () {
            (this.$refs.input || this.$refs.textarea).select();
        },
        resizeTextarea () {
            if (this.$isServer) return;
            const {autosize, type} = this;
            if (type !== 'textarea') return;
            if (!autosize) {
                this.textareaCalcStyle = {
                    minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
                };
                return;
            }
            const minRows = autosize.minRows;
            const maxRows = autosize.maxRows;

            this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
        },
        handleFocus (event) {
            this.focused = true;
            this.$emit('focus', event);
        },
        handleComposition (event) {
            if (event.type === 'compositionstart') {
                this.isOnComposition = true;
            }
            if (event.type === 'compositionend') {
                this.isOnComposition = false;
                this.handleInput(event);
            }
        },
        handleInput (event) {
            if (this.isOnComposition) return;

            // hack for https://github.com/ElemeFE/element/issues/8548
            // should remove the following line when we don't support IE
            if (event.target.value === this.nativeInputValue) return;

            this.$emit('input', event.target.value);

            // set input's value, in case parent refuses the change
            // see: https://github.com/ElemeFE/element/issues/12850
            this.$nextTick(() => {
                if (this.$refs.input) {
                    this.$refs.input.value = this.value;
                }
            });
        },
        handleChange (event) {
            this.$emit('change', event.target.value);
        },
        calcIconOffset (place) {
            let elList = [].slice.call(this.$el.querySelectorAll(`.nicety-input__${place}`) || []);
            if (!elList.length) return;
            let el = null;
            for (let i = 0; i < elList.length; i++) {
                if (elList[i].parentNode === this.$el) {
                    el = elList[i];
                    break;
                }
            }
            if (!el) return;
            const pendantMap = {
                suffix: 'append',
                prefix: 'prepend'
            };

            const pendant = pendantMap[place];
            if (this.$slots[pendant]) {
                el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$el.querySelector(`.input-group-${pendant}`).offsetWidth}px)`;
            } else {
                el.removeAttribute('style');
            }
        },
        updateIconOffset () {
            this.calcIconOffset('prefix');
            this.calcIconOffset('suffix');
        },
        clear () {
            this.$emit('input', '');
            this.$emit('change', '');
            this.$emit('clear');
        }
    },

    created () {
        this.$on('inputSelect', this.select);
    },

    mounted () {
        if (this.visible) {
            this.resizeTextarea();
            this.updateIconOffset();
        }
    },

    updated () {
        this.$nextTick(this.updateIconOffset);
    }
};
</script>
