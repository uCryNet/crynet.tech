<template>
  <div class="admin-article">
    <form @submit.prevent="getContent">
      <input
        required
        v-model.lazy.trim="state.title"
        placeholder="Title"
        class="input admin-article__title"
      />

      <select
        v-model="state.category"
        name="category"
        required
        class="select admin-article__select"
      >
        <optgroup
          :label="categoryUnit.title"
          v-for="categoryUnit in allCategory"
          :key="categoryUnit.title"
        >
          <option
            :value="subCategoriesUnit.name"
            v-for="subCategoriesUnit in categoryUnit.subCategories"
            :key="subCategoriesUnit.name"
          >
            {{ subCategoriesUnit.name }}
          </option>
        </optgroup>
      </select>

      <div class="admin-article__text">
        <Editor
          v-model="state.text"
          :api-key="TINYMCE_KEY"
          :init="CONFIG"
        />
      </div>

      <input
        :required="!state?._id"
        @change="onFileChanged($event)"
        accept="image/*"
        class="admin-article__preview"
        type="file"
      />

      <button
        type="submit"
        class="btn btn--yellow btn--big"
      >
        <template v-if="state?._id">
          UPDATE
        </template>

        <template v-else>
          ADD
        </template>
      </button>
    </form>

    <button
      class="btn btn--red btn--big mt--20"
      v-if="state?._id"
      @click="onCancel"
    >
      CANCEL
    </button>
  </div>
</template>

<script setup lang="ts">
// Vendors
import { computed, onMounted, ref, toRefs } from "vue";
import { useStore } from "vuex";
import Editor from '@tinymce/tinymce-vue'

// Types
import { IArticle, ICategory, IEvent } from "@/interfaces/interfaces";
import { ICreatePost, IUpdatePost } from "@/views/AdminPanel/AdminPanel.types";

// Variables
import API from "@/api/api"
import { TINYMCE_KEY, SERVER } from "@/config/constant";

// Utils
import parseResponseError from "@/utils/parseResponseError"


interface IAdminArticle {
  updatePostData: () => void
  category: ICategory[]
  edit: IArticle
}


const props = defineProps<IAdminArticle>()
const { updatePostData, edit } = toRefs(props)

const store = useStore()

const allCategory = computed(() => store.getters.getAllCategory)

const state = ref<IUpdatePost>({
  _id: "",
  title: "",
  category: "css",
  image: null,
  text: "",
})

const CONFIG = {
  height: 500,
  images_upload_handler: (blobInfo: any, success: any) => {
    const formData = new FormData()
    formData.append("file", blobInfo.blob(), blobInfo.filename())

    API.uploadImage(formData)
      .then(res => success(SERVER + res.data.link))
      .catch(error => console.error(parseResponseError(error)))
  },
  codesample_global_prismjs: true,
  menubar: true,
  plugins: [
    'advlist autolink lists link image',
    'code',
    'media table code codesample'
  ],
  toolbar:
    'undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | codesample'
}

const clearPostData = () => {
  state.value = {
    _id: "",
    title: "",
    category: "css",
    image: null,
    text: "",
  }
}

const onFileChanged = ($event: IEvent<HTMLInputElement>) => {
  state.value.image = $event.target.files ? $event.target.files[ 0 ] : null
}

const onCancel = () => {
  updatePostData
  clearPostData()
}

const getContent = async () => {
  if (!state.value.text) return alert("Fill all fields!")

  const isUpdate = edit.value?._id
  const data = { ...state.value }

  isUpdate
    ? await API.updatePost(data)
      .then(() => alert(`Article updated!`))
      .catch(error => console.error(parseResponseError(error)))
    : await API.createPost(data as ICreatePost)
      .then(() => alert(`Article added!`))
      .catch(error => console.error(parseResponseError(error)))

  updatePostData
  clearPostData()
}

onMounted(() => {
  if (edit.value?._id) {
    state.value = {
      _id: edit.value._id,
      title: edit.value.title,
      category: edit.value.category,
      image: null,
      text: edit.value.text,
    }
  }
})
</script>

<style scoped lang="scss">
@import "AdminArticle";
</style>