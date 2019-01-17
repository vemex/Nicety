<template>
    <label :title="title">{{value}}</label>
</template>
<script>
    export default {
        props:{
            value:[String,Number,Boolean],
            title:[String]
        }
    }
</script>
