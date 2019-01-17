import Tree from "./src/tree"

export default {
    install: function (Vue) {
        Vue.component(Tree.name, Tree);
    }
}
