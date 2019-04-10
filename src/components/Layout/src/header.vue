<template>
    <header class="nicety-header" :style="{ height }">
        <slot></slot>
    </header>
</template>

<script>
    import {getStyle, getStyleNumber} from "../../../utils/dom";

    export default {
        name: 'NicetyHeader',

        componentName: 'NicetyHeader',

        props: {
            height: {
                type: String,
                default: 'auto'
            }
        }
    };
</script>
