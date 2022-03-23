<template>
  <span>
    <slot v-bind="{isDark: isDark(), handleChangeTheme }"/>
  </span>
</template>

<script>
export default {
  name: "CategoryConsumer",
  inject: ["handleChangeTheme", "isDark"]
};
</script>

<style>
</style>
