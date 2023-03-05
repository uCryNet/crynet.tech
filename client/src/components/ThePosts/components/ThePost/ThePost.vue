<template>
  <router-link
    class="post"
    :to="{ name: 'TheArticle', params: { id, category } }"
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
          {{ getDate[0] }}
        </strong>

        {{ getDate[1] }}.{{ getDate[2] }}
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

const getDate = date.split(".")
const getDescription = text.substring(0, 200) + "..."
const poster = SERVER + image
const onError = () => isError.value = true
</script>