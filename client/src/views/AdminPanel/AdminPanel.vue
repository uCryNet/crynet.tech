<template>
  <div v-if="state.isAdmin" class="admin-panel">
    <Aside
      :switchBlock="switchBlock"
      :block="state.block"
    />

    <div>
      <AdminArticle
        v-if="state.block === 'article'"
        :edit="state.edit"
        :category="category"
        :getPosts="getPosts"
        :clearEditPostData="clearEditPostData"
      />

      <AdminArticles
        v-else-if="state.block === 'articles'"
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
// Vendors
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";

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

  setup() {
    const store = useStore()

    const state = ref({
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

    onMounted(() => {
      API.checkAccess()
        .then(() => state.value.isAdmin = true)
        .catch(error => console.error(parseResponseError(error)))
    })

    const category = computed(() => store.getters.getAllCategory)
    const posts = computed(() => store.getters.getAllPost)

    const switchBlock = (block) => {
      if (state.value.block !== block) state.value.block = block
    }

    const editArticle = (article) => {
      state.value.block = "article"
      state.value.edit = { ...article }
    }

    const getPosts = () => {
      store.dispatch("getAllPosts")
    }

    const deleteArticle = async (id, title) => {
      const isDelete = confirm(`Вы точно хотите удалить пост: "${ title }"`)

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
        _id: ""
      }
    }

    watch(
      () => state.value.block,
      () => {
        if (state.value.block === "article" && !state.value._id) {
          clearEditPostData()
        }
      }
    )

    return {
      clearEditPostData,
      deleteArticle,
      getPosts,
      editArticle,
      switchBlock,
      posts,
      category,
      state
    }
  }
}
</script>

<style scoped lang="scss">
@import "AdminPanel";
</style>