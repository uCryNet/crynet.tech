<template>
  <div class="admin-article">
    <form @submit.prevent="getContent">
      <input required v-model.lazy.trim="state.title" placeholder="Title" class="input admin-article__title"/>

      <select v-model="state.category" name="category" required class="select admin-article__select">
        <optgroup :label="categoryUnit.title" v-for="categoryUnit in allCategory" :key="categoryUnit.title">
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

      <button type="submit" class="btn btn--yellow btn--big">
        <template v-if="state?._id">ОБНОВИТЬ СТАТЬЮ</template>
        <template v-else>ДОБАВИТЬ СТАТЬЮ</template>
      </button>
    </form>

    <button class="btn btn--red btn--big mt--20" v-if="state?._id" @click="cancel">
      ОТМЕНИТЬ РЕДАКТИРОВАНИЕ
    </button>
  </div>
</template>

<script lang="ts">
// Vendors
import { computed, defineComponent, onMounted, PropType, ref, toRefs } from "vue";
import { useStore } from "vuex";
import Editor from '@tinymce/tinymce-vue'

// Types
import { IArticle, ICategory, IEvent } from "@/interfaces/interfaces";
import { IUpdatePost } from "@/views/AdminPanel/AdminPanel.types";

// Vars
import API from "@/api/api"
import { TINYMCE_KEY } from "@/config/constant"

// Utils
import parseResponseError from "@/utils/parseResponseError"


export default defineComponent({
  name: 'AdminArticle',

  components: {
    Editor
  },

  props: {
    clearEditPostData: Function,
    category: {
      type: Object as PropType<ICategory>,
      required: true
    },
    edit: {
      type: Object as PropType<IArticle>,
      required: true
    }
  },

  setup(props) {
    const { clearEditPostData, edit } = toRefs(props)

    const store = useStore()

    const state = ref<IUpdatePost>({
      _id: "",
      title: "",
      category: "css",
      image: "",
      text: "",
    })

    const CONFIG = {
      height: 500,
      images_upload_handler: (blobInfo: any, success: any) => {
        const formData = new FormData()
        formData.append("file", blobInfo.blob(), blobInfo.filename())

        API.uploadImage(formData)
          .then(res => {
            success(res.data.link);
          })
          .catch(error => {
            console.error(parseResponseError(error))
          })
      },
      codesample_global_prismjs: true,
      menubar: true,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount codesample'
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help | codesample'
    }

    const clearPostData = () => {
      state.value = {
        _id: "",
        title: "",
        category: "css",
        image: "",
        text: "",
      }
    }

    const onFileChanged = ($event: IEvent<HTMLInputElement>) => {
      state.value.image = $event.target.files ? $event.target.files[0] : ""
    }

    const cancel = () => {
      clearEditPostData
      clearPostData()
    }

    const getContent = async () => {
      if (!state.value.text) return alert("Заполните все поля!")

      const isUpdate = edit.value?._id
      const data = { ...state.value }

      const getPosts = () => {
        store.dispatch("getAllPosts")
      }

      isUpdate
        ? await API.updatePost(data)
          .then(() => alert(`Статья обновлена!`))
          .catch(error => console.error(parseResponseError(error)))
        : await API.createPost(data)
          .then(() => alert(`Статья добавленна!`))
          .catch(error => console.error(parseResponseError(error)))

      getPosts()
      clearEditPostData
      clearPostData()
    }

    onMounted(() => {
      if (edit.value?._id) {
        state.value = {
          _id: edit.value._id,
          title: edit.value.title,
          category: edit.value.category,
          image: edit.value.image,
          text: edit.value.text,
        }
      }
    })

    const allCategory = computed(() => store.getters.getAllCategory)

    return {
      allCategory,
      cancel,
      onFileChanged,
      getContent,
      CONFIG,
      TINYMCE_KEY,
      state
    }
  }
})
</script>

<style scoped lang="scss">
@import "AdminArticle";
</style>