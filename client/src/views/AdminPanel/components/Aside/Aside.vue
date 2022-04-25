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

<script lang="js">
export default {
  name: 'Aside',

  props: {
    menus: Array,
    switchBlock: Function,
    block: String
  }
}
</script>

<style scoped lang="scss">
@import "Aside";
</style>