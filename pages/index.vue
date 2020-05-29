<template>
  <div class="text-center">
    <h1 class="text-2xl font-bold text-red-600">診断チャートメーカー</h1>
    <div class="mt-12">
      <p class="text-sm text-gray-500">超簡単♪</p>
      <p class="text-red-600 mb-1">あなたも診断を作ってみよう</p>
      <button
        class="block mx-auto bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded"
        @click="$router.push('/posts/create')"
      >
        <i class="mdi mdi-pencil mr-1" />
        診断をつくる
      </button>
    </div>
    <h2 class="text-xl font-bold mt-12">新着一覧</h2>
    <PostList :posts="posts" class="mt-2" />
    <button
      v-show="hasNext && posts.length >= LIMIT"
      class="bg-red-500 hover:bg-red-700 text-white font-bold h-10 w-32 rounded mt-4"
      @click="readMorePosts"
    >
      <span v-if="!isProcessing">もっと見る</span>
      <div v-else class="spinner"></div>
    </button>
    <div class="mt-12">
      <p class="text-sm text-gray-500">超簡単♪</p>
      <p class="text-red-600 mb-1">あなたも診断を作ってみよう</p>
      <button
        class="block mx-auto bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded"
        @click="$router.push('/posts/create')"
      >
        <i class="mdi mdi-pencil mr-1" />
        診断をつくる
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostList from '~/components/partials/post/PostList.vue'
import { Post } from '~/types/struct'
import { toPost } from '~/utils/transformer/toObject'

const LIMIT: number = 15

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
      .limit(LIMIT)
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
  },
  computed: {
    LIMIT(): number {
      return LIMIT
    }
  },
  methods: {
    async readMorePosts(): Promise<void> {
      this.isProcessing = true
      try {
        const postDocuments = await this.$firestore
          .collection('posts')
          .orderBy('createdAt', 'desc')
          .startAfter(this.posts[this.posts.length - 1].createdAt)
          .limit(LIMIT)
          .get()
        const posts = postDocuments.docs.map(
          (postDocument): Post => {
            return toPost(postDocument)
          }
        )
        this.posts = [...this.posts, ...posts]
        this.hasNext = posts.length === LIMIT
      } catch (e) {
      } finally {
        this.isProcessing = false
      }
    }
  }
})
</script>
