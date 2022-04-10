<template>
  <div>
    <Header/>

    <div class="container">
      <router-view></router-view>
    </div>

    <Footer/>
  </div>
</template>


<script lang="js">
// Vendors
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

// Components
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// Utils
import debounce from "@/utils/debounce";

// Variables
import { ROUTE_LINK } from "@/router";


export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch("getCategory")
      store.dispatch("getAllPosts")
    })

    const routes = computed(() => store.getters.fullPath)
    const filters = computed(() => store.getters.getFilter)

    watch(
      () => routes,
      ({ value }) => {
        if (value !== ROUTE_LINK.root) return

        if (!this.filters.search || !this.filters.category)
          store.dispatch("setFilters", {search: "", category: ""})
      },
      { deep: true }
    )

    watch(
      () => filters,
      ({ value }) => debounce(() => store.dispatch("getAllPosts", value),600),
      { deep: true }
    )
  }
}
</script>