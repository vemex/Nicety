<template>
    <div :class="['fields','form-row']">
        <label v-if="label">{{ label }}</label>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'nicety-fields',
    props: {
        label: { type: String }
    },
    inject: [
        'nicetyForm'
    ],
    provide () {
        return {
            'nicetyForm': this.nicetyForm
        };
    },
    mounted () {
    }
};
</script>
