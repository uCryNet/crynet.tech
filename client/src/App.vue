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
// Components
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ROUTE_LINK } from "@/router";

// Utils
import debounce from "@/utils/debounce";


export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

  created() {
    this.$store.dispatch("getCategory");
    this.$store.dispatch("getAllPosts");
  },

  watch: {
    filters: {
      handler(value) {
        debounce(() => this.$store.dispatch("getAllPosts", value),600)
      },
      deep: true,
    },

    routes: {
      handler(value) {
        if (value !== ROUTE_LINK.root) return

        if (!this.filters.search || !this.filters.category)
          this.$store.dispatch("setFilters", {search: "", category: ""})
      }
    }
  },

  computed: {
    filters() {
      return this.$store.getters.getFilter
    },

    routes() {
      return this.$route.fullPath
    }
  },
}
</script>