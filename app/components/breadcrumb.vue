<template>
    <ol class="breadcrumb">
        <li class="breadcrumb-item" v-for="(item,index) in breadlist" >
            <router-link :to="item.path">{{item.name}}</router-link>
        </li>
    </ol>
</template>
<script>
    export default{
        created() {
            this.getBreadcrumb(true);//刷新的参数为true
        },
        data() {
            return {
                breadlist: '' // 路由集合
            }
        },
        methods: {
            getBreadcrumb(isreload) {
                console.log('getBreadcrumb');
                var breadNumber= typeof(this.$route.meta.breadNumber)!="undefined"?this.$route.meta.breadNumber:1;//面包屑位置索引放到meta里预设好，首页索引为0，一级默认为1
                var breadLength=this.$store.state.breadListState.length;//目前breadlist集合数组个数
                var curName=this.$route.name;
                var curPath=this.$route.fullPath;
                var newBread={name:curName,path:curPath};
                this.$store.commit('increment');
                if(breadNumber===0||breadNumber===1){//点击首页或者一级
                    this.$store.commit('breadListStateRemove',1);//初始化，只有首页面包屑按钮
                    if(breadNumber===1){//点击一级菜单
                        this.$store.commit('breadListStateAdd',newBread);//当前页面添加到breadlist集合
                    }
                }else{
                    if(!isreload){
                        if(breadLength<=breadNumber){//breadlist集合个数等于或者小于目前层级breadNumber
                            this.$store.commit('breadListStateAdd',newBread);//要把当前路由添加到breadlist集合
                        }else{
                            this.$store.commit('breadListStateRemove',parseInt(breadNumber)+1);//如果往回点面包屑导航，截取；
                        }
                    }else{//刷新，state.breadListState被初始化，从缓存取值；
                        this.$store.state.breadListState=JSON.parse(sessionStorage.getItem('breadListStorage'));
                    }
                }
                this.breadlist=this.$store.state.breadListState;
                sessionStorage.setItem('breadListStorage',JSON.stringify(this.breadlist))
            }
        },
        watch: {
            $route () {
                this.getBreadcrumb();
            }
        },
    }
</script>