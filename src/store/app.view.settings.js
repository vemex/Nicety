const  state={
    useTabView:false,
    currentLang:"",
};
const getters={
    useTabView:state=>state.useTabView,
    currentLang:state=>state.currentLang
};
const mutations={
    setUseTabView(state,useTabView){
        state.useTabView=useTabView;
    },
    setCurrentLang(state,lang){
        state.currentLang=lang;
    }
};
export default {
    namespaced: true,
    state,
    getters,
    mutations
}