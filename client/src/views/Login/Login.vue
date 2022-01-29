<template>
  <form class="login" @submit="send">
    <label class="login__field">
      <input placeholder="Login" v-model.lazy.trim="login" class="input login__inpu"/>
    </label>

    <label class="login__field">
      <input placeholder="Password" v-model.lazy.trim="password" class="input login__input" type="password"/>
    </label>

    <div class="login__error" v-if="error.isError">
      {{ this.error.message }}
    </div>

    <button type="submit" class="btn login__btn">Login</button>
  </form>
</template>

<script lang="js">
// Utils
import parseResponseError from "@/utils/parseResponseError";

// Vars
import {ROUTE_LINK} from "../../router";
import API from "@/api/api"

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
  }
}
</script>

<style scoped lang="scss">
@import "Login";
</style>