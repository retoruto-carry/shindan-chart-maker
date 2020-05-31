<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <nuxt-link :to="`/posts/${post.id}`">
          <div
            class="border bg-white text-gray-900 p-4 mb-4 max-w-xl hover:bg-gray-200 hover:shadow text-left mx-auto"
          >
            <p class="font-bold text-gray-700">
              {{ post.title }}
            </p>
            <p class="text-sm text-gray-600 truncate">
              テストの説明ですテストの説明ですテストの説明ですテストの説明ですテストの説明ですテストの説明です
            </p>
          </div>
        </nuxt-link>
        <!--
        <nuxt-link
          v-show="$auth.currentUser && post.userId === $auth.currentUser.uid"
          :to="`/posts/${post.id}/edit`"
          class="text-gray-600 underline ml-4 text-sm"
        >
          <i class="mdi mdi-pencil" />
          編集
        -->
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
