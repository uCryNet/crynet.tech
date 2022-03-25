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


export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

  created() {
    this.$store.dispatch("getCategory");
  },
}
</script>