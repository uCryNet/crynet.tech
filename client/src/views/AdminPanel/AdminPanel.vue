<template>
  <div
    v-if="state.isAdmin"
    class="admin-panel"
  >
    <TheAside
      :menus="MENUS"
      :switch-block="switchBlock"
      :block="state.block"
    />

    <div>
      <AdminArticle
        v-if="state.block === 'article'"
        :edit="state.edit"
        :category="category"
        :clear-edit-post-data="clearEditPostData"
      />

      <AdminArticles
        v-else-if="state.block === 'articles'"
        :edit-article="editArticle"
        :delete-article="deleteArticle"
        :lists="state.allArticles"
      />
    </div>
  </div>

  <NotFound v-else />
</template>

<script setup lang="ts">
// Vendors
import { useStore } from "vuex";
import { computed, onMounted, reactive, watch } from "vue";

// Types
import { IArticle } from "@/interfaces/interfaces";
import { IMenus, IMenusType } from "@/views/AdminPanel/components/AdminPanel.types";

// Components
import TheAside from "./components/TheAside/TheAside.vue"
import AdminArticle from "./components/AdminArticle/AdminArticle.vue";
import AdminArticles from "./components/AdminArticles/AdminArticles.vue";
import NotFound from "@/views/NotFound/NotFound.vue";

// Utils
import parseResponseError from "../../utils/parseResponseError";

// Var
import API from "@/api/api"


const store = useStore()

const state = reactive<{
  isAdmin: boolean,
  block: IMenusType,
  edit: IArticle
  allArticles: IArticle[]
}>({
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
  allArticles: []
})

const MENUS: IMenus = {
  article: { text: "Add article", value: "article" },
  articles: { text: "All articles", value: "articles" },
}

const category = computed(() => store.getters.getAllCategory)

const switchBlock = (block: IMenusType) => {
  if (state.block !== block) state.block = block
}

const editArticle = (article: IArticle) => {
  state.block = "article"
  state.edit = { ...article }
}

const getPosts = () => {
  API.getPosts()
    .then(res => state.allArticles = res.data.data)
    .catch(error => {
      console.error(parseResponseError(error))
    })
}

const deleteArticle = async (id: string, title: string) => {
  const isDelete = confirm(`Are you sure you want to delete this post: "${title}"`)

  if (isDelete) {
    await API.deletePost(id)
      .catch(error => console.error(parseResponseError(error)))

    await getPosts()
  }
}

const clearEditPostData = () => {
  state.edit = {
    author: "",
    category: "",
    date: "",
    image: "",
    text: "",
    title: "",
    _id: "",
  }
}

onMounted(() => {
  API.checkAccess()
    .then(() => state.isAdmin = true)
    .catch(error => console.error(parseResponseError(error)))

  getPosts()
})

watch(
  () => state.block,
  () => {
    if (state.block === MENUS.articles.value && state.edit._id) {
      clearEditPostData()
    }
  }
)
</script>

<style scoped lang="scss">
@import "AdminPanel";
</style>