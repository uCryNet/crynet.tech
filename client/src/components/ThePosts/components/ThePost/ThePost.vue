<template>
  <router-link
    class="post"
    :to="{ name: ROUTES_CONFIG.article.name, params: { id, category } }"
  >
    <img
      @error="onError"
      class="post__image"
      :src="isError
        ? NotFoundImage
        : poster"
    />

    <div class="post__time">
      <div class="post__date">
        <strong>
          {{ articleDate[0] }}
        </strong>

        {{ articleDate[1] }}.{{ articleDate[2] }}
      </div>
    </div>

    <div class="post__text">
      <h4 class="post__category">
        {{ category }}
      </h4>

      <h1 class="post__title">
        {{ title }}
      </h1>

      <div
        class="post__desc"
        v-html="getDescription"
      />
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import "ThePost";
</style>

<script setup lang="ts">
// Vendors
import { ref, toRefs } from "vue";

// Types
import { IArticle } from "@/interfaces/interfaces";

// Variables
import NotFoundImage from "@/assets/img/post/404.webp";
import { SERVER } from "@/config/constant";
import { ROUTES_CONFIG } from "@/router";


interface IPostProps {
  post: IArticle
}


const props = defineProps<IPostProps>()
const { post } = toRefs(props)
const {
  _id: id,
  text,
  image,
  date,
  category,
  title,
} = post.value

const isError = ref<boolean>(false)

const articleDate = date.split(".")
const poster = SERVER + image

const onError = () => isError.value = true
const getDescription = text
  .replace(/(<([^>]+)>)/ig,'')
  .substring(0, 100)
  .trim()
  + '...'
</script>