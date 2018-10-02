<template>
    <li :class="classObject" @click="clickHandler">
        <slot>{{ itemDisplay }}</slot>
    </li>
</template>
<script>
    export default {
        name: 'nicety-option',
        props: {
            disabled: { type: Boolean, default: false },
            index: { type: [String, Number], required: true },
            itemDisplay: { type: String, required: true },
            data:{ type: Object, required: false }
        },
        data () {
            return {
                active: false
            }
        },
        computed: {
            classObject () {
                return [
                    'item',
                    { 'active': this.active },
                    { 'disabled': this.disabled }
                ]
            }
        },
        methods: {
            clickHandler (evt) {
                evt.itemKey = this.itemKey;
                this.$emit('click', evt)
            }
        }
    }
</script>