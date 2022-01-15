<template>
  <form class="login">
    <label class="login__field">
      <div>Login:</div>
      <input class="login__input" type="text"/>
    </label>

    <label class="login__field">
      <div>Password:</div>
      <input class="login__input" type="password"/>
    </label>

    <button class="login__btn">Login</button>
  </form>
</template>

<script lang="js">
import API from "../../api/api";

export default {
  name: 'Login',

  mounted() {
    API.login()
      .then(res => {
        console.log(res)
        // this.list = res.data
      })
      .catch(error => console.log(error))
  }
}
</script>

<style scoped lang="scss">
@import "Login";
</style>