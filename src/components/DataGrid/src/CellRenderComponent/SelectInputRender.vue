<template>
    <div>
        <nicety-select v-model="valueObj">
            <template v-for="item in options">
                <nicety-option :value="item.value" :label="item.label">{{item.label}}</nicety-option>
            </template>
        </nicety-select>
    </div>
</template>

<script>
    export default {
        name: "SelectInputRender",
        props: {
            options: {type: Array, default: []},
            value:{default: ''}
        },
        computed:{
            valueObj:{
                get: function () {
                    return this.value
                },
                set: function (v) {
                    this.$emit("update:value",v);
                    this.$emit("input",v);
                }
            }
        }
    }
</script>

<style scoped>

</style>
