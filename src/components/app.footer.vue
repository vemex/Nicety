<template>
    <footer>
        <div>
            <!-- react-text: 45 -->© {{copyrightTimeRange}}, {{copyright}}
            <!-- react-text: 48 -->. All rights reserved.
            <!-- /react-text -->Version：{{version}}
        </div>
    </footer>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            //   MainLayout
            ...mapGetters("AppConstants",{
                version: "version",
                copyrightTimeRange: "copyrightTimeRange",
                copyright: "copyright",
            })
        },
    }
</script>
