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
        :lists="posts"
      />
    </div>
  </div>

  <NotFound v-else />
</template>

<script lang="ts">
// Vendors
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";

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


export default {
  name: 'AdminPanel',

  components: {
    AdminArticles,
    AdminArticle,
    TheAside,
    NotFound
  },

  setup() {
    const store = useStore()

    const state = ref<{
      isAdmin: boolean,
      block: IMenusType,
      edit: IArticle
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
    })

    const MENUS: IMenus = {
      article: { text: "Add article", value: "article" },
      articles: { text: "All articles", value: "articles" },
    }

    onMounted(() => {
      API.checkAccess()
        .then(() => state.value.isAdmin = true)
        .catch(error => console.error(parseResponseError(error)))
    })

    const category = computed(() => store.getters.getAllCategory)
    const posts = computed(() => store.getters.getAllPost)

    const switchBlock = (block: IMenusType) => {
      if (state.value.block !== block) state.value.block = block
    }

    const editArticle = (article: IArticle) => {
      state.value.block = "article"
      state.value.edit = { ...article }
    }

    const getPosts = () => {
      store.dispatch("getAllPosts")
    }

    const deleteArticle = async (id: string, title: string) => {
      const isDelete = confirm(`Вы точно хотите удалить пост: "${title}"`)

      if (isDelete) {
        await API.deletePost(id)
          .catch(error => console.error(parseResponseError(error)))

        await getPosts()
      }
    }

    const clearEditPostData = () => {
      state.value.edit = {
        author: "",
        category: "",
        date: "",
        image: "",
        text: "",
        title: "",
        _id: "",
      }
    }

    watch(
      () => state.value.block,
      () => {
        if (state.value.block === MENUS.articles.value && state.value.edit._id) {
          clearEditPostData()
        }
      }
    )

    return {
      clearEditPostData,
      deleteArticle,
      editArticle,
      switchBlock,
      posts,
      category,
      state,
      MENUS
    }
  }
}
</script>

<style scoped lang="scss">
@import "AdminPanel";
</style>