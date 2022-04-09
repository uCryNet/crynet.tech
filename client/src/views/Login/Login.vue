<template>
  <form class="login" @submit="send">
    <label class="login__field">
      <input name="login" placeholder="Login" v-model.lazy.trim="login" class="input login__input"/>
    </label>

    <label class="login__field">
      <input name="password" placeholder="Password" v-model.lazy.trim="password" class="input login__input" type="password"/>
    </label>

    <div class="login__error" v-if="error.isError">
      {{ this.error.message }}
    </div>

    <button type="submit" class="btn btn--big login__btn">LOGIN</button>
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
      isAuthorized: false,
      error: {
        isError: false,
        message: ''
      },
      login: '',
      password: ''
    }
  },

  methods: {
    send(e) {
      e.preventDefault()

      API.login({login: this.login, password: this.password})
        .then(() => {
          this.isAuthorized = true
        })
        .catch(error => {
          const message = parseResponseError(error)

          this.error.isError = true
          this.error.message = message
        })
    },
  },

  watch: {
    isAuthorized() {
      if (!this.isAuthorized) return

      API.checkAccess()
        .then(res => {
          const {isAdmin} = res.data

          isAdmin
           ? this.$router.push(ROUTE_LINK.adminPanel)
           : this.$router.push(ROUTE_LINK.root)
        })
        .catch(error => {
          this.$router.push(ROUTE_LINK.root)

          console.error(parseResponseError(error))
        })
    }
  },

  mounted() {
    API.checkAccess()
      .then(res => {
        const {isAdmin} = res.data

        isAdmin && this.$router.push(ROUTE_LINK.adminPanel)
      })
  }
}
</script>

<style scoped lang="scss">
@import "Login";
</style>