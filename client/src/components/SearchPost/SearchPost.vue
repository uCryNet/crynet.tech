<template>
  <div class="search-post">
    <div class="search-post__wrap">
      <div class="search-post__search-inner">
        <input @input="send" v-model.trim="searchText" class="input search-post__search-input" placeholder="Поиск по статьям" />

        <button @click="clear" class="search-post__search-clear" v-if="searchText">
          <svg width="12" height="12" viewBox="0 0 352 512"><path fill="#c2b26f" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
// Utils
import debounce from "../../utils/debounce";


export default {
  name: 'SearchPost',

  data() {
    return {
      searchText: "",
    };
  },

  methods: {
    send() {
      const search = this.searchText

      search
        ? debounce(() => this.get({search}), 500)
        : this.get()
    },

    clear() {
      this.searchText = ""
      this.get()
    },

    get(data) {
      this.$store.dispatch("getAllPosts", data)
    },
  },

  watch: {
    search() {
      this.send()
    }
  },

  computed: {
    posts() {
      return this.$store.getters.getAllPost
    }
  }
}
</script>

<style scoped lang="scss">
@import "SearchPost";
</style>