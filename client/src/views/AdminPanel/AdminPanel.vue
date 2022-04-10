<template>
  <div v-if="this.isAdmin" class="admin-panel">
    <Aside
      :switchBlock="switchBlock"
      :block="this.block"
    />

    <div>
      <AdminArticle
        v-if="this.block === 'article'"
        :edit="edit"
        :category="category"
        :getPosts="getPosts"
        :clearEditPostData="clearEditPostData"
      />

      <AdminArticles
        v-else-if="this.block === 'articles'"
        :editArticle="editArticle"
        :deleteArticle="deleteArticle"
        :lists="posts"
      />
    </div>
  </div>

  <div v-else class="text--100 text--40 text--center text--raleway mb--10 mt--10">
    <div>Отказанно в доступе</div>
  </div>
</template>

<script lang="js">
// Components
import Aside from "./components/Aside/Aside"
import AdminArticle from "./components/AdminArticle/AdminArticle";
import AdminArticles from "./components/AdminArticles/AdminArticles";

// Utils
import parseResponseError from "../../utils/parseResponseError";

// Var
import API from "@/api/api"


export default {
  name: 'AdminPanel',

  components: {
    AdminArticles,
    AdminArticle,
    Aside
  },

  data() {
    return {
      isAdmin: false,
      block: "article",
      edit: {
        author: "",
        category: "",
        date: "",
        image: "",
        text: "",
        title: "",
        _id: "",
      },
    }
  },

  mounted() {
    API.checkAccess()
      .then(() => this.isAdmin = true)
      .catch(error => console.error(parseResponseError(error)))
  },

  methods: {
    switchBlock(block) {
      if (this.block !== block) this.block = block
    },

    editArticle(article) {
      this.block = "article"
      this.edit = {...article}
    },

    async deleteArticle(id, title) {
      const isDelete = confirm(`Вы точно хотите удалить пост: "${title}"`)

      if (isDelete) {
        await API.deletePost(id)
          .catch(error => console.error(parseResponseError(error)))

        await this.getPosts()
      }
    },

    getPosts() {
      this.$store.dispatch("getAllPosts")
    },

    clearEditPostData() {
      this.edit = {
        author: "",
        category: "",
        date: "",
        image: "",
        text: "",
        title: "",
        _id: "",
      }
    }
  },

  watch: {
    block() {
      if (this.block === "article" && !this.edit._id) {
        this.clearEditPostData()
      }
    }
  },

  computed: {
    category() {
      return this.$store.getters.getAllCategory;
    },

    posts() {
      return this.$store.getters.getAllPost
    }
  },
}
</script>

<style scoped lang="scss">
@import "AdminPanel";
</style>