<template>
  <Header/>

  <div class="container">
    <router-view></router-view>
  </div>

  <Footer/>
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
  }
}
</script>