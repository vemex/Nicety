<template>
    <div>
        <template v-for="item in actions">
            <button class="btn btn-primary mr-1" @click="handClick(item.type)" v-if="checkVisible(item.type)">{{item.display}}</button>
        </template>
    </div>
</template>
<script>
    export default {
        props: {
            rowData: [Object],
            actions: [Array]
        },
        methods: {
            checkVisible:function(type){
                let result = this.actions.filter(function (item) {
                    return item.type === type
                });
                if (result.length > 0&& result[0].visibility) {
                    return result[0].visibility.apply(this,[{rowData: this.rowData, type}]);
                }
                return true;
            },
            handClick: function (type) {
                let result = this.actions.filter(function (item) {
                    return item.type === type
                });
                if (result.length > 0) {
                    result[0].callback.apply(this,[{rowData: this.rowData, type}]);
                }
            }
        }
    }
</script>
