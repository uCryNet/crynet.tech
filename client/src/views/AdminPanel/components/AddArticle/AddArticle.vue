<template>
  <form class="add-article" @submit="getContent">
    <input placeholder="Title" class="input add-article__title"/>

    <select class="select add-article__select">
      <optgroup label="1">
        <option>1</option>
        <option>2</option>
      </optgroup>
      <optgroup label="2">
        <option>3</option>
        <option>4</option>
      </optgroup>
      <option>5</option>
    </select>

    <div class="add-article__text">
      <quill-editor style="height: 250px" :content="content" :options="options"></quill-editor>
    </div>

    <input class="add-article__preview" type="file"/>

    <button class="btn btn--bg btn--big">ДОБАВИТЬ СТАТЬЮ</button>
  </form>
</template>

<script lang="js">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: 'AddArticle',

  components: {
    QuillEditor
  },

  data() {
    return {
      content: "",
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
}
</script>

<style scoped lang="scss">
@import "AddArticle";
</style>