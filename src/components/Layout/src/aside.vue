<template>
    <aside class="nicety-aside" :style="{ width }">
        <slot></slot>
    </aside>
</template>

<script>
    export default {
        name: 'NicetyAside',

        componentName: 'NicetyAside',

        props: {
            width: {
                type: String,
                default: '300px'
            }
        }
    };
</script>
