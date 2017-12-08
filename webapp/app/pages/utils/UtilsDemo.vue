<template>
    <div  >
        <border-utils></border-utils>
        <color-utils></color-utils>
        <display-utils></display-utils>

    </div>
</template>
<<style>
 

    .utils-demo .card {
        float: left;
        margin-right: 2em;
        margin-bottom: 2em;
    }
</style>

<<script>
import BorderUtils from "./BorderUtils.vue"
import ColorUtils from "./ColorUtils.vue"
import DisplayUtils from "./DisplayUtils.vue"
export default {
  components:{BorderUtils,ColorUtils,DisplayUtils}
}
</script>

