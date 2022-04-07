<template>
  <form class="admin-article">
    <input required v-model.lazy.trim="form.title" placeholder="Title" class="input admin-article__title"/>

    <select v-model="form.category" name="category" required class="select admin-article__select">
      <optgroup :label="categoryUnit.title" v-for="categoryUnit in allcategory" :key="categoryUnit.title">
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
        v-model="form.text"
        :api-key="this.apiKey"
        :init="conf"
      />
    </div>

    <input
      :required="!this.edit?._id"
      @change="onFileChanged($event)"
      accept="image/*"
      class="admin-article__preview"
      type="file"
    />

    <button class="btn btn--yellow btn--big" @click.prevent="getContent">
      <template v-if="this.edit?._id">ОБНОВИТЬ СТАТЬЮ</template>
      <template v-else>ДОБАВИТЬ СТАТЬЮ</template>
    </button>

    <button class="btn btn--red btn--big mt--20" v-if="this.edit?._id" @click.prevent="cancel">
      ОТМЕНИТЬ РЕДАКТИРОВАНИЕ
    </button>
  </form>
</template>

<script lang="js">
import Editor from '@tinymce/tinymce-vue'

import API from "@/api/api"
import { TINYMCE_KEY } from "@/config/constant"

import parseResponseError from "@/utils/parseResponseError"


export default {
  name: 'AdminArticle',


  components: {
    Editor
  },

  props: {
    getPosts: Function,
    clearEditPostData: Function,
    category: Array,
    edit: {
      author: String,
      category: String,
      date: String,
      image: String,
      text: String,
      title: String,
      _id: String,
    }
  },

  data() {
    return {
      form: {
        title: '',
        category: "css",
        image: null,
        text: '',
      },

      conf: {
        height: 500,
        images_upload_handler: (blobInfo, success) => {
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
    }
  },

  methods: {
    async getContent() {
      if (!this.form.text) return alert("Заполните все поля!")

      const isUpdate = this.edit?._id
      const data = { ...this.form }

      isUpdate
        ? await API.updatePost({ ...data, id: this.edit._id })
          .then(() => alert(`Статья обновлена!`))
          .catch(error => console.error(parseResponseError(error)))
        : await API.createPost(data)
          .then(() => alert(`Статья добавленна!`))
          .catch(error => console.error(parseResponseError(error)))

      this.getPosts()
      this.clearEditPostData()
      this.clearPostData()
    },

    onFileChanged($event) {
      this.form.image = $event.target.files[0]
    },

    clearPostData() {
      this.form = {
        title: '',
        category: "css",
        image: null,
        text: '',
      }
    },

    cancel() {
      this.clearEditPostData()
      this.clearPostData()
    },
  },

  mounted() {
    if (this.edit?._id) {
      this.form = {
        title: this.edit.title,
        category: this.edit.category,
        image: this.edit.image,
        text: this.edit.text,
      }
    }
  },

  created() {
    this.apiKey = TINYMCE_KEY
  },

  computed: {
    allcategory() {
      return this.$store.getters.getAllCategory;
    }
  },
}
</script>

<style scoped lang="scss">
@import "AdminArticle";
</style>