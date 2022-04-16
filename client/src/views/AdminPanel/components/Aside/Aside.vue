<template>
  <div class="aside">
    <h6 class="block-title">МЕНЮ</h6>

    <ul class="aside__lists">
      <li v-for="menu in MENUS" :key="menu.value">
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
    switchBlock: Function,
    block: String
  },

  setup() {
    const MENUS = [
      { text: "Добавить статью", value: "article" },
      { text: "Все статьи", value: "articles" },
    ]

    return {
      MENUS
    }
  }
}
</script>

<style scoped lang="scss">
@import "Aside";
</style>