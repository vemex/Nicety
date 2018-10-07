<template>
    <div :class="['field','form-group',`col-md-${span}`]" v-show="visible">
        <label v-if="label" class="label">{{ label }}</label>
        <div>
            <!--<input type="hidden" v-model="_value" :name="name" v-validate="rules"/>-->
            <component :is="renderType"
                       :name="name"
                       :value.sync="_value"
                       :class="[{'error':errorMessage},'form-control']"
                       :placeholder="placeholder" v-validate="rules"
                       :readonly="readonly"></component>
        </div>
        <transition name="slide">
            <p class="alert-danger" v-if="errorMessage">{{ errorMessage }}</p>
        </transition>
    </div>
</template>
<script>
    import TextInput from './Inputs/TextInput'
    import EmailInput from './Inputs/EmailInput'
    import PasswordInput from './Inputs/PasswordInput'

    export default {
        name: 'nicety-field',
        components: {
            TextInput,
            EmailInput,
            PasswordInput
        },
        props: {
            label: {type: String},//字段标签
            placeholder: {type: String},
            renderType: {type: String, default: "TextInput"},//显示类型
            span: {type: [String, Number], default: 0},
            disabled: {type: Boolean, default: false},
            inline: {type: Boolean, default: false},
            name: {type: String}, // 需校验的字段名
            rules: {type: String}, // 验证规则
            value: {type: String, default: ""},
            readonly: {type: Boolean, default: false},
            visible: {type: Boolean, default: true}//可见性
        },
        watch: {},
        created: function () {
        },
        computed: {
            _value: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('update:value', value)
                }
            },
            errorMessage: function () {
                if (this.errors.has(this.name)) {
                    return this.errors.first(this.name)
                }
                return null;
            }
        },
        methods: {
            addError(errorMsg){
                this.errors.add(
                    {
                        field: this.name,
                        msg: errorMsg
                    }
                )
            },
            clearError(){
                this.errors.clear()
            }
        }
    }
</script>