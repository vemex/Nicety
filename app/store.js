import Vuex from 'vuex'
import Vue from "vue"


Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        breadListState:[
            {name:'Home',path:'/'}
        ]
    },
    mutations: {
        breadListStateAdd(state,obj){
            state.breadListState.push(obj);
        },
        breadListStateRemove(state,num){
            state.breadListState=state.breadListState.slice(0,num);
        }
    }

});
export default store