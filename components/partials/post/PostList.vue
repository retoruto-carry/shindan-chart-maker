<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <nuxt-link :to="`/posts/${post.id}`" class="text-red-600 underline">
          {{ post.title }}
        </nuxt-link>
        <nuxt-link
          v-show="$auth.currentUser && post.userId === $auth.currentUser.uid"
          :to="`/posts/${post.id}/edit`"
          class="text-gray-600 underline ml-4 text-sm"
        >
          <i class="mdi mdi-pencil" />
          編集
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
