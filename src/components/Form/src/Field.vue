<template>
    <div :class="['field','form-group',`col-md-${span}`,{'inline-row':inline}]" v-show="visible">
        <label v-if="label" :class="['label',labelClass]">{{ label }}</label>
        <div :class="[inputClass]" :style="inputStyleObject">
            <component :is="renderType" ref="component" :style="inputStyleObject"
                       v-model="inputProps.value"
                       v-bind="inputProps"
                       :name="name" v-validate="rules"
                       :class="[{'error':errorMessage}]"
            >
                <slot></slot>
            </component>
            <transition name="slide">
                <p class="alert-danger" v-if="errorMessage">{{ errorMessage }}</p>
            </transition>
        </div>

    </div>
</template>
<script>
    import TextInput from '../../Inputs/TextInput.js';
    import EmailInput from '../../Inputs/EmailInput.js';
    import PasswordInput from '../../Inputs/PasswordInput.js';
    import TextareaInput from '../../Inputs/TextareaInput.js';
    import SelectInput from '../../Inputs/SelectInput.js';
    import CheckboxInput from '../../Inputs/CheckboxInput.js';

    export default {
        name: 'nicety-field',
        componentName: 'NicetyFiled',
        components: {
            TextInput,
            EmailInput,
            PasswordInput,
            TextareaInput,
            SelectInput,
            CheckboxInput
        },
        inject: [
            'nicetyForm'
        ],
        provide() {
            return {
                'nicetyForm': this.nicetyForm,
                'nicetyFiled': this
            };
        },
        props: {
            'inputValue': {type: [String, Array, Object, Number, Boolean], default: null},
            label: {type: String}, // 字段标签
            inputPlaceholder: {type: String},
            renderType: {type: String, default: null}, // 显示类型
            span: {type: [String, Number], default: 12},
            inline: {type: Boolean, default: false},
            labelSpan: {type: [String, Number], default: 4},
            inputWidth: {type: [String], default: 'auto'},
            name: {type: String}, // 需校验的字段名
            rules: {type: String, default: 'empty'}, // 验证规则
            inputReadonly: {type: Boolean, default: false}, // 只读
            visible: {type: Boolean, default: true}// 可见性
        },
        watch: {
            value: function () {
                this.errors.clear();
            }
        },
        mounted: function () {
            //this.$refs.component.$slots = this.$slots;
        },
        computed: {
            inputStyleObject() {
                if (this.inline && this.inputWidth !== 'auto') {
                    return {width: this.inputWidth, flex: 'none'};
                }
                return {width: this.inputWidth};
            },
            labelClass() {
                if (this.inline) {
                    return `col-md-${this.labelSpan} col-form-label`;
                }
                return '';
            },
            inputClass() {
                if (this.inline) {
                    return `col-md-${12 - this.labelSpan}`;
                }
                return '';
            },
            inputProps: function () {
                if (this.$inputProps) {
                    return this.$inputProps;
                }
                let Obj = function (owner) {
                    this._owner = owner;
                };
                for (let index in this.$props) {
                    if (!index.startsWith('input')) {
                        continue;
                    }
                    let key = index.substr('input'.length).toLowerCase();
                    Obj.prototype.__defineGetter__(key, function () {
                        return this._owner[index];
                    });
                    Obj.prototype.__defineSetter__(key, function (value) {
                        this._owner.$emit('update:' + index, value);
                    });
                }
                for (let index in this.$attrs) {
                    if (!index.startsWith('input')) {
                        continue;
                    }
                    let key = index.substr('input'.length).toLowerCase();
                    if (key.startsWith('-')) {
                        key = key.substr(1);
                    }
                    Obj.prototype.__defineGetter__(key, function () {
                        return this._owner.$attrs[index];
                    });
                    Obj.prototype.__defineSetter__(key, function (value) {
                        this._owner.$emit('update:' + index, value);
                    });
                }
                this.$inputProps = new Obj(this);
                return this.$inputProps;
            },
            errorMessage: function () {
                if (this.errors.has(this.name)) {
                    return this.errors.first(this.name);
                }
                return null;
            }
        },
        data: function () {
            return {
                validateState: ''
            };
        },
        methods: {
            addError(errorMsg) {
                this.errors.add(
                    {
                        field: this.name,
                        msg: errorMsg
                    }
                );
            },
            clearError() {
                this.errors.clear();
            }
        }
    };
</script>
