<template>
  <div class="aside">
    <h6 class="block-title">МЕНЮ</h6>

    <ul class="aside__lists">
      <li v-for="menu in menus" :key="menu.value">
        <div :class="[block === menu.value && 'aside__active']" @click="switchBlock(menu.value)">
          {{ menu.text }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="js">
// Var
import {ROUTE_LINK} from "@/router/index";

const MENUS = [
  {text: "Добавить статью", value: "article"},
  {text: "Все статьи", value: "articles"},
]

export default {
  name: 'Aside',

  props: {
    switchBlock: Function,
    block: String
  },

  created() {
    this.ROUTE_LINK = ROUTE_LINK
    this.menus = MENUS
  }
}
</script>

<style scoped lang="scss">
@import "Aside";
</style>