<template>
    <div>
        <div class="page-title">
            <app-breadcrumb></app-breadcrumb>
        </div>
        <div class="page-content">
            <div>
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>
<script>
    import AppBreadcrumb from "./app.breadcrumb"

    export default {
        components: {
            AppBreadcrumb
        }
    }
</script>