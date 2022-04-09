<template>
  <div>
    <div class="mb--20">
      <h2 class="title text--center mb--20">СТАТЬИ <span>И ЗАМЕТКИ</span></h2>
      <div class="text text--center">Делюсь опытом и записываю всякое</div>
    </div>

    <SearchPost />

    <Posts />
  </div>
</template>

<script lang="js">
import SearchPost from "../../components/SearchPost/SearchPost";
import Posts from "../../components/Posts/Posts";

export default {
  name: "Home",

  components: {
    Posts,
    SearchPost
  }
}
</script>