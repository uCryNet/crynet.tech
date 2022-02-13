<template>
  <form class="add-article" @submit.prevent="getContent">
    <input required v-model.lazy.trim="form.title" placeholder="Title" class="input add-article__title"/>

    <select v-model="form.category" name="category" required class="select add-article__select">
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

    <div class="add-article__text">
      <quill-editor ref="editor" style="height: 250px" :options="options"></quill-editor>
    </div>

    <input required @change="onFileChanged($event)" accept="image/*" class="add-article__preview" type="file"/>

    <button class="btn btn--bg btn--big">ДОБАВИТЬ СТАТЬЮ</button>
  </form>
</template>

<script lang="js">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import API from "@/api/api"
import parseResponseError from "../../../../utils/parseResponseError";
// import { ImageResize } from 'quill-image-resize-module';

// QuillEditor.register('modules/imageDrop', ImageResize);

export default {
  name: 'AddArticle',

  components: {
    QuillEditor
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
      },
      options: {
        placeholder: 'Текст статьи',
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        }
      }
    }
  },

  methods: {
    getContent() {
      const text = this.$refs.editor.getHTML()
      const form = this.form

      if (!text && !form.category && !form.title && !form.file) return

      const data = {...this.form, text: text}

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
}
</script>

<style scoped lang="scss">
@import "AddArticle";
</style>