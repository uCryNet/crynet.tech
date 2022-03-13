<template>
  <form class="admin-article" @submit.prevent="getContent">
    <input required v-model.lazy.trim="form.title" placeholder="Title" class="input admin-article__title"/>

    <select v-model="form.category" name="category" required class="select admin-article__select">
      <optgroup :label="categoryUnit.title" v-for="categoryUnit in category" :key="categoryUnit.title">
        <option
          :value="subCategoriesUnit.name"
          v-for="subCategoriesUnit in categoryUnit.subCategories"
          :key="subCategoriesUnit.name"
        >
          {{subCategoriesUnit.name}}
        </option>
      </optgroup>
    </select>

    <div class="admin-article__text">
      <Editor
        v-model="form.text"
        :api-key="this.apiKey"
        :init="{
         height: 500,
         menubar: true,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
      />
    </div>

    <input required @change="onFileChanged($event)" accept="image/*" class="admin-article__preview" type="file"/>

    <button class="btn btn--bg btn--big">ДОБАВИТЬ СТАТЬЮ</button>
  </form>
</template>

<script lang="js">
import Editor from '@tinymce/tinymce-vue'

import API from "@/api/api"
import {TINYMCE_KEY} from "@/config/constant"

import parseResponseError from "@/utils/parseResponseError"

export default {
  name: 'AdminArticle',

  components: {
    Editor
  },

  props: {
    category: Array,
  },

  data() {
    return {
      form: {
        title: '',
        category: "css",
        image: null,
        text: '',
      },
    }
  },

  methods: {
    getContent() {
      const form = this.form

      if (!form.text && !form.category && !form.title && !form.file) return

      const data = {...this.form}

      API.createNews(data)
        .then(() => {
          alert("Статья добавленна!")
        })
        .catch(error => console.error(parseResponseError(error)))
    },

    onFileChanged($event) {
      this.form.image = $event.target.files[0]
    }
  },

  created() {
    this.apiKey = TINYMCE_KEY
  }
}
</script>

<style scoped lang="scss">
@import "AdminArticle";
</style>