<template>
  <div>
    <h1 class="text-2xl font-bold text-red-600">診断チャートメーカー</h1>
    <h2 class="text-xl font-bold mt-2">診断一覧</h2>
    <PostList :posts="posts" class="mt-2" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostList from '~/components/partials/post/PostList.vue'
import { Post } from '~/types/struct'
import { toPost } from '~/utils/transformer/toObject'

type LocalData = {
  hasNext: boolean
  isProcessing: boolean
  posts: Post[]
}

export default Vue.extend({
  components: {
    PostList
  },
  async asyncData({ app }) {
    const postDocuments = await app.$firestore
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .get()
    const posts = postDocuments.docs.map(
      (postDocument): Post => {
        return toPost(postDocument)
      }
    )
    return {
      posts
    }
  },
  data(): LocalData {
    return {
      hasNext: true,
      isProcessing: false,
      posts: []
    }
  }
})
</script>
