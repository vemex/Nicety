

// initial state
const state = {
    Breadlist:[
        {name:'Home',path:'/'}
    ]
};

// getters
const getters = {
    Breadlist:state=>state.Breadlist
};

// actions
const actions = {
    updateBreadListState ({ commit,getters },option) {
        let route=option.route;
        let isreload=option.isreload;
        let breadNumber= typeof(route.meta.breadNumber)!="undefined"?route.meta.breadNumber:1;//面包屑位置索引放到meta里预设好，首页索引为0，一级默认为1
        let breadLength=getters.Breadlist.length;//目前breadlist集合数组个数
        let newBread={name:route.name,path:route.fullPath};
        if(breadNumber<=1){//点击首页或者一级
            commit("removeBreadList",1);
            if(breadNumber===1  &&(newBread.name!=null && newBread.name!=="" && newBread.name!==undefined)){//点击一级菜单
                commit("addBreadList",newBread)//当前页面添加到breadlist集合
            }
        }else{
            if(!isreload){
                if(breadLength<=breadNumber){//breadlist集合个数等于或者小于目前层级breadNumber
                    commit("addBreadList",newBread); //要把当前路由添加到breadlist集合
                }else{
                    commit("removeBreadList",parseInt(breadNumber)+1);//如果往回点面包屑导航，截取；
                }
            }
        }
    }
};

// mutations
const mutations = {
    addBreadList(state,newbread) {
        state.Breadlist.push(newbread);
    },
    removeBreadList(state,index) {
        state.Breadlist= state.Breadlist.slice(0,index);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}