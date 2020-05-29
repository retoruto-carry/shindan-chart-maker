<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <nuxt-link :to="`/posts/${post.id}`" class="text-red-600 underline">
          {{ post.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Post } from '~/types/struct'

export default Vue.extend({
  name: 'PostList',
  props: {
    posts: {
      type: Array as PropType<Post[]>,
      required: true
    }
  },
  methods: {}
})
</script>
