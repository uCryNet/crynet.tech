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
      />

      <AdminArticles
        v-else-if="this.block === 'articles'"
        :editArticle="editArticle"
        :deleteArticle="deleteArticle"
        :lists="this.articles"
      />

      <div v-else-if="this.block === 'category'">2</div>
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
import {ROUTE_LINK} from "../../router";
import axios from "axios";


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

    deleteArticle: function (id, title) {
      const isDelete = confirm(`Вы точно хотите удалить пост: "${title}"`)

      if (isDelete) {
        API.deletePost(id)
          .then(() => {
            this.getPosts()
          })
          .catch(error => console.error(parseResponseError(error)))
      }
    },

    getPosts: function () {
      API.getPosts()
        .then(res => {
          this.articles = res.data
        })
        .catch(error => console.error(parseResponseError(error)))
    }
  },

  watch: {
    isAdmin() {
      if (!this.isAdmin) return

      axios.all([
        API.getPosts(),
        API.getCategory()
      ])
        .then(axios.spread((
          newsResponse,
          categoryResponse
        ) => {
          this.category = categoryResponse.data
          this.articles = newsResponse.data
        }))
        .catch(error => {
          console.error(parseResponseError(error))
        })
    },

    block() {
      if (this.block === "article" && !this.edit._id) {
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "AdminPanel";
</style>