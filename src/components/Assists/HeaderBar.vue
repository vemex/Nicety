<template>
    <div :class="classesObj">
        <div>
            <h4>{{title}}</h4>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        componentName: "NicetyHeaderBar",
        name: "NicetyHeaderBar",
        props: {
            title: {type: String, default: ""},
            classes: {type: Array, default:function () {
                    return [];
                }}
        }, computed: {
            classesObj:function () {
                let result=   ["header-bar"];
                for (let index in this.classes) {
                    result.push(this.classes[index])
                }
                return result;
            }
        }
    }
</script>
