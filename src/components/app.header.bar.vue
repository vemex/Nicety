<template>
    <div class="header-bar">
        <div class="d-flex justify-content-between">
            <div class="left-container">
                <slot name="left"></slot>
            </div>
            <div class="right-container">
                <slot name="right"></slot>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped>

</style>