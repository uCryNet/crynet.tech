<template>
  <router-link class="post" :to="{name: 'Article', params: {id, category}}">
    <img class="post__image" :src="getImageLink"/>

    <div class="post__time">
      <div class="post__date">
        <strong>{{ getDate[0] }}</strong>
        {{ getDate[1] }}.{{ getDate[2] }}
      </div>
    </div>

    <div class="post__text">
      <h4 class="post__category">{{ category }}</h4>
      <h1 class="post__title">{{ title }}</h1>
      <div class="post__desc" v-html="getDescription"></div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import "Post";
</style>

<script lang="ts">
// Vendors
import { defineComponent, toRefs } from "vue";

// Variables
import { SERVER } from "@/config/api";


export default defineComponent({
  name: 'Post',

  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },
    date: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const { text, image, date } = toRefs(props)

    const getDate = date.value.split(".")
    const getDescription = text.value.substring(0, 200) + "..."
    const getImageLink = image.value ? `${SERVER}${image.value}` : `/media/img/post/not-found-image.jpg`

    return {
      getDate,
      getDescription,
      getImageLink
    }
  }
})
</script>