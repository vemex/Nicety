<template>
    <div  >
        <border-utils></border-utils>

    </div>
</template>
<<style>
    .bd-example [class^=border] {
        display: inline-block;
        width: 5rem;
        height: 5rem;
        margin: .25rem;
        background-color: #f5f5f5;
        border: 1px solid;
        text-align:center;
        vertical-align: bottom;
    }
</style>

<<script>
import BorderUtils from "./BorderUtils.vue"
export default {
  components:{BorderUtils}
}
</script>

