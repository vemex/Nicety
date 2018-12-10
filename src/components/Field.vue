<template>
    <div :class="['field','form-group',`col-md-${span}`]" v-show="visible">
        <label v-if="label" class="label">{{ label }}</label>
        <div>
            <component :is="renderType"  ref="component"
                       v-model="inputProps.value"
                       v-bind="inputProps"
                       :name="name"  v-validate="rules"
                       :class="[{'error':errorMessage}]"
            >
            </component>
        </div>
        <transition name="slide">
            <p class="alert-danger" v-if="errorMessage">{{ errorMessage }}</p>
        </transition>
    </div>
</template>
<script>
import TextInput from './Inputs/TextInput.js';
import EmailInput from './Inputs/EmailInput.js';
import PasswordInput from './Inputs/PasswordInput.js';
import TextareaInput from './Inputs/TextareaInput.js';
export default {
    name: 'nicety-field',
    componentName: 'NicetyFiled',
    components: {
        TextInput,
        EmailInput,
        PasswordInput,
        TextareaInput
    },
    inject: [
        'nicetyForm'
    ],
    provide () {
        return {
            'nicetyForm': this.nicetyForm,
            'nicetyFiled': this
        };
    },
    props: {
        'inputValue': {type: [String, Array, Object], default: null},
        label: {type: String}, // 字段标签
        inputPlaceholder: {type: String},
        renderType: {type: String, default: null}, // 显示类型
        span: {type: [String, Number], default: 12},
        inline: {type: Boolean, default: false},
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
        this.$refs.component.$slots = this.$slots;
    },
    computed: {
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
        addError (errorMsg) {
            this.errors.add(
                {
                    field: this.name,
                    msg: errorMsg
                }
            );
        },
        clearError () {
            this.errors.clear();
        }
    }
};
</script>
