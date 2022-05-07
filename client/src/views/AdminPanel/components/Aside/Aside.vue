<template>
  <div class="aside">
    <h6 class="block-title">МЕНЮ</h6>

    <ul class="aside__lists">
      <li v-for="menu in Object.values(menus)" :key="menu.value">
        <div :class="[block === menu.value && 'aside__active']" @click="switchBlock(menu.value)">
          {{ menu.text }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// Types
import { IMenus, IMenusType } from "@/views/AdminPanel/components/AdminPanel.types";
import { PropType } from "vue";

export default {
  name: 'Aside',

  props: {
    menus: {
      type: Object as PropType<IMenus>,
      required: true
    },
    switchBlock: Function,
    block: {
      type: String as PropType<IMenusType>,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "Aside";
</style>