const  state={
    useTabView:false
};
const getters={
    useTabView:state=>state.useTabView
};
const mutations={
    setUseTabView(state,useTabView){
        state.useTabView=useTabView;
    }
};
export default {
    namespaced: true,
    state,
    getters,
    mutations
}