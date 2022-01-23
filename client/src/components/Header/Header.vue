<template>
  <header class="header">
    <Menu />

    <div class="header__info container">
      <div class="text--100 text--white text--40 text--raleway mb--10">ОЧЕРЕДНОЙ</div>

      <h2 class="text--900 text--white text--60 text--raleway mb--20">БЛОГ</h2>

      <div class="text--14 text--white">
        Ещё один блог ещё одного программиста, который делится своим опытом
      </div>
    </div>
  </header>
</template>

<script lang="js">
import Menu from "@/components/Menu/Menu"

export default {
  name: 'Header',

  components: {
    Menu
  }
}
</script>

<style lang="scss" scoped>
@import "Header";
</style>