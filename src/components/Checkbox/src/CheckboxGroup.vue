<script>
    import Emitter from '../../../mixins/emitter';

    export default {
        name: 'NicetyCheckboxGroup',

        componentName: 'NicetyCheckboxGroup',

        mixins: [Emitter],

        inject: {
            'nicetyForm': {
                default: ''
            },
            'nicetyFiled': {
                default: ''
            }
        },

        props: {
            value: {},
            disabled: Boolean,
            min: Number,
            max: Number,
            size: String,
            fill: String,
            textColor: String
        },

        computed: {
            checkboxGroupSize() {
                return this.size || (this.$ELEMENT || {}).size;
            }
        },

        watch: {
            value(value) {
                this.dispatch('NicetyFiled', 'nicety.form.change', [val]);
            }
        }
    };
</script>

<template>
    <div class="nicety-checkbox-group" role="group" aria-label="checkbox-group">
        <slot></slot>
    </div>
</template>
