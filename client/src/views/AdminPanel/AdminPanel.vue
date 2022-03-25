<template>
  <div class="admin-panel">
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
        :lists="this.articles"
      />
    </div>
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
import {ROUTE_LINK} from "../../router"


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
      category: [],
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
      articles: []
    }
  },

  mounted() {
    API.checkAccess()
      .then(() => {
        this.isAdmin = true
      })
      .catch(() => {
        this.$router.push(ROUTE_LINK.root)
      })
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
      API.getPosts()
        .then(res => {
          this.articles = res.data
        })
        .catch(error => console.error(parseResponseError(error)))
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
    isAdmin() {
      if (!this.isAdmin) return

      API.getPosts()
        .then(res => this.articles = res.data)
        .catch(error => console.error(parseResponseError(error)))
    },

    block() {
      if (this.block === "article" && !this.edit._id) {
        this.clearEditPostData()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "AdminPanel";
</style>