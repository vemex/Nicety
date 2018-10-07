<template>
    <input type="password" v-model="_value" :placeholder="placeholder" :readonly="readonly"/>
</template>
<script>
    export default {
        name: "nicety-password-input",
        $_veeValidate: {
            name: function () {
                return this.name;
            },
            value: function () {
                return this.value;
            }
        },
        props: {
            name: [String],
            value: [String],
            placeholder: {type: String},
            readonly:{type: Boolean}
        },
        computed: {
            _value: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                    this.$emit('update:value', value)
                }
            }
        }
    }
</script>