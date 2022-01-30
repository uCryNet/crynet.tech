<template>
  <div class="aside">
    <h6 class="block-title">МЕНЮ</h6>

    <ul>
      <li>
        <router-link class="router-link" :to="ROUTE_LINK.adminPanel">Добавить статью</router-link>
      </li>
      <li><s>Все статьи</s></li>
      <li><s>Добавить категорию</s></li>
    </ul>
  </div>
</template>

<script>
// Var
import {ROUTE_LINK} from "@/router/index";

export default {
  created() {
    this.ROUTE_LINK = ROUTE_LINK
  }
}
</script>

<style scoped lang="scss">
@import "Aside";
</style>