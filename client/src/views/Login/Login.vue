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
        .then(res => {
          console.log(res)
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