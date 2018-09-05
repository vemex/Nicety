<template>
   <div>
     <base-card></base-card>
     <color-card></color-card>
     <title-card>
     </title-card>
     <tab-card></tab-card>
     <layout-card></layout-card>
   </div>
</template>
<script>
import  TitleCard from "./card/TitleCard.vue";
import  ColorCard from "./card/ColorCard.vue";
import  BaseCard from "./card/BaseCard.vue";
import  TabCard from "./card/TabCard.vue";
import  LayoutCard from "./card/LayoutCard.vue";
export default {
  components:{TitleCard,ColorCard,BaseCard,TabCard,LayoutCard}
}
</script>

