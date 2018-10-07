<template>
    <input v-model="_value" :placeholder="placeholder" :readonly="readonly"/>
</template>
<script>
    export default {
        name: "nicety-input",
        props: {
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
                    this.$emit('update:value', value)
                }
            }
        }
    }
</script>