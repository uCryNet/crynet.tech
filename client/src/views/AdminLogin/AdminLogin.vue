<template>
  <form
    class="admin-login"
    @submit.prevent="send"
  >
    <label class="admin-login__field">
      <input
        required
        v-model.lazy.trim="state.login"
        name="admin-login"
        placeholder="Login"
        class="input login__input"
      />
    </label>

    <label class="admin-login__field">
      <input
        required
        v-model.lazy.trim="state.password"
        name="password"
        placeholder="Password"
        class="input login__input"
        type="password"
      />
    </label>

    <div
      class="admin-login__error"
      v-if="state.error.isError"
    >
      {{ state.error.message }}
    </div>

    <button
      type="submit"
      class="btn btn--big login__btn"
    >
      LOGIN
    </button>
  </form>
</template>

<script setup lang="ts">
// Vendors
import { onMounted, ref, watch, } from "vue";
import { useRouter } from "vue-router";

// Variables
import { ROUTES_CONFIG } from "@/router";
import API from "@/api/api"

// Utils
import parseResponseError from "@/utils/parseResponseError";


const router = useRouter()

const state = ref<{
  isAuthorized: boolean
  login: string
  password: string
  error: {
    isError: boolean
    message: string
  }
}>({
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

      isAdmin && router.push(ROUTES_CONFIG.adminPanel.path)
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
          ? router.push(ROUTES_CONFIG.adminPanel.path)
          : router.push(ROUTES_CONFIG.root.path)
      })
      .catch(error => {
        router.push(ROUTES_CONFIG.root.path)
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
</script>

<style scoped lang="scss">
@import "AdminLogin";
</style>