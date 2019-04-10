<template>
    <button type="button" class="btn btn-link" style="user-select: text !important;" @click="handlerClick">{{value}}
    </button>
</template>

<script>
    export default {
        name: 'LinkButton',
        props: {
            value: {default: ''},
        },
        inject: ['nicetyFiled'],
        mounted: function () {

        },
        methods: {
            handlerClick: function () {
                this.nicetyFiled.$emit("input-click", this.value);
            }
        }
    }
</script>
