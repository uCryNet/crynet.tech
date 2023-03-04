<template>
  <div>
    <TheHeader/>

    <div class="container">
      <router-view/>
    </div>

    <TheFooter/>
  </div>
</template>


<script lang="ts">
// Vendors
import { computed,  onMounted, watch } from "vue";
import { useStore } from "vuex";

// Components
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheFooter from "@/components/TheFooter/TheFooter.vue";

// Utils
import debounce from "@/utils/debounce";

// Variables
import { ROUTE_LINK } from "@/router";
import { useRoute, } from "vue-router";


export default {
  name: 'App',

  components: {
    TheHeader,
    TheFooter
  },

  setup() {
    const store = useStore()

    const route = useRoute()

    onMounted(() => {
      store.dispatch("getCategory")
      store.dispatch("getAllPosts")
    })

    const routes = computed(() => route.fullPath)
    const filters = computed(() => store.getters.getFilter)
    const isPending = computed(() => store.getters.getIsPending)

    watch(
      () => routes,
      ({ value }) => {
        if (value === ROUTE_LINK.root)
          store.dispatch("setFilters", { search: "", category: "" })
      },
      { deep: true }
    )

    watch(
      () => filters,
      ({ value }) => {
        store.dispatch("setPending", true)

        debounce(() => {
          store.dispatch("getAllPosts", value)
        }, 600)
      },
      { deep: true }
    )

    return {
      isPending
    }
  }
}
</script>