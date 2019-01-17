<template>
    <button type="button" class="btn btn-link" @click="handlerRoute" >{{value}}</button>
</template>

<script>
export default {
    name:'RouteLinkRender',
    props:{
        value:{default:''},
        route:[Object]
    },
    inject:[],
    mounted:function(){

    },
    methods:{
        handlerRoute:function () {
            (this.router||this.$router||this._data.$router).push(this.route);
        }
    }
}
</script>
