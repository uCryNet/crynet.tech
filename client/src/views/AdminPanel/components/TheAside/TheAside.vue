<template>
  <div class="aside">
    <h6 class="title-block">MENU</h6>

    <ul class="aside__lists">
      <li v-for="menu in Object.values(menus)" :key="menu.value">
        <div :class="[block === menu.value && 'aside__active']" @click="switchBlock(menu.value)">
          {{ menu.text }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Types
import { IMenus, IMenusType } from "@/views/AdminPanel/components/AdminPanel.types";


interface IAsideProps {
  menus: IMenus
  switchBlock: (value: IMenusType) => void
  block: IMenusType
}


defineProps<IAsideProps>()
</script>

<style scoped lang="scss">
@import "TheAside";
</style>