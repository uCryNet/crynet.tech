<template>
  <div>
    <div class="mb--20">
      <h2 class="title text--center mb--20">СТАТЬИ <span>И ЗАМЕТКИ</span></h2>
      <div class="text text--center">Делюсь опытом и записываю всякое</div>
    </div>

    <SearchPost/>

    <Posts/>
  </div>
</template>

<script lang="ts">
// Vendors
import { onMounted } from "vue";

// Components
import SearchPost from "@/components/SearchPost/SearchPost.vue";
import Posts from "@/components/Posts/Posts.vue";


export default {
  name: "Home",

  components: {
    Posts,
    SearchPost
  },

  setup() {
    onMounted(() => {
      document.title = "CryNet"
    })
  }
}
</script>