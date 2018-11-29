<template>
    <div>
        <h4>没有权限访问页面{{url}}}</h4>
    </div>
</template>
<script>
export default {
    props: {
        url: {
            type: String,
            default: 'none'
        }
    }
};
</script>
