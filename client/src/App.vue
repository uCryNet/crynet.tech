<template>
  <div>
    <Header/>

    <div class="container">
      <router-view></router-view>
    </div>

    <Footer/>
  </div>
</template>


<script lang="ts">
// Vendors
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

// Components
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";

// Utils
import debounce from "@/utils/debounce";

// Variables
import { ROUTE_LINK } from "@/router";
import { useRoute, } from "vue-router";


export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

  setup() {
    const store = useStore()

    const route = useRoute()

    onMounted(() => {
      store.dispatch("getCategory")
      store.dispatch("getAllPosts")
    })

    const routes = computed(() => route.fullPath)
    const filters: any = computed(() => store.getters.getFilter)

    watch(
      () => routes,
      ({ value }) => {
        if (value !== ROUTE_LINK.root) return

        if (!filters.search || !filters.category)
          store.dispatch("setFilters", { search: "", category: "" })
      },
      { deep: true }
    )

    watch(
      () => filters,
      ({ value }) => debounce(() => store.dispatch("getAllPosts", value), 600),
      { deep: true }
    )
  }
}
</script>