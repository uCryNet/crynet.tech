<template>
  <form class="login" @submit.prevent="send">
    <label class="login__field">
      <input
        required
        v-model.lazy.trim="state.login"
        name="login"
        placeholder="Login"
        class="input login__input"
      />
    </label>

    <label class="login__field">
      <input
        required
        v-model.lazy.trim="state.password"
        name="password"
        placeholder="Password"
        class="input login__input"
        type="password"
      />
    </label>

    <div class="login__error" v-if="state.error.isError">
      {{ state.error.message }}
    </div>

    <button type="submit" class="btn btn--big login__btn">LOGIN</button>
  </form>
</template>

<script lang="js">
// Vendors
import { onMounted, ref, watch, } from "vue";
import { useRouter } from "vue-router";

// Utils
import parseResponseError from "@/utils/parseResponseError";

// Vars
import { ROUTE_LINK } from "@/router";
import API from "@/api/api"


export default {
  name: 'Login',

  setup() {
    const router = useRouter()

    const state = ref({
      isAuthorized: false,
      login: '',
      password: '',
      error: {
        isError: false,
        message: ''
      }
    })

    onMounted(() => {
      API.checkAccess()
        .then(res => {
          const { isAdmin } = res.data

          isAdmin && router.push(ROUTE_LINK.adminPanel)
        })
    })

    watch(
      () => state.value.isAuthorized,
      (isAuthorized) => {
        if (!isAuthorized) return

        API.checkAccess()
          .then(res => {
            const { isAdmin } = res.data

            isAdmin
              ? router.push(ROUTE_LINK.adminPanel)
              : router.push(ROUTE_LINK.root)
          })
          .catch(error => {
            router.push(ROUTE_LINK.root)
            console.error(parseResponseError(error))
          })
      }
    )

    const send = () => {
      const { login, password } = state.value

      API.login({ login, password })
        .then(() => {
          state.value.isAuthorized = true
        })
        .catch(error => {
          const message = parseResponseError(error)

          state.value.error.isError = true
          state.value.error.message = message
        })
    }

    return {
      state,
      send
    }
  }
}
</script>

<style scoped lang="scss">
@import "Login";
</style>