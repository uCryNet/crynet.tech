<template>
  <form class="login" @submit="send">
    <label class="login__field">
      <div>Login:</div>
      <input v-model.lazy.trim="login" class="login__input" type="text"/>
    </label>

    <label class="login__field">
      <div>Password:</div>
      <input v-model.lazy.trim="password" class="login__input" type="password"/>
    </label>

    <div class="login__error" v-if="error.isError">
      {{ this.error.message }}
    </div>

    <button class="login__btn">Login</button>
  </form>
</template>

<script lang="js">
import API from "@/api/api"
import parseResponseError from "@/utils/parseResponseError";
import {ROUTE_LINK} from "../../router";

export default {
  name: 'Login',

  data() {
    return {
      error: {
        isError: false,
        message: ''
      },
      login: '',
      password: ''
    }
  },

  methods: {
    send: function (e) {
      e.preventDefault()

      API.login({login: this.login, password: this.password})
        .then(() => {
          this.$router.push(ROUTE_LINK.adminPanel)
        })
        .catch(error => {
          const message = parseResponseError(error)

          this.error.isError = true
          this.error.message = message
        })
    }
  },
  mounted() {
    console.log(document.cookie)
  }
}
</script>

<style scoped lang="scss">
@import "Login";
</style>