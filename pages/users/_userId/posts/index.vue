<template>
  <div class="text-center">
    <figure>
      <img :src="user.photoUrl" class="h-16 w-16 rounded-full mx-auto" />
    </figure>
    <h1 class="text-xl font-bold mt-4">
      {{ user.displayName }} さんの投稿一覧
    </h1>
    <ButtonPostCreate class="mt-8" />
    <PostList :posts="posts" class="mt-8" />
    <button
      v-show="hasNext && posts.length >= LIMIT"
      class="bg-red-500 hover:bg-red-700 text-white font-bold h-10 w-32 rounded mt-4"
      @click="readMorePosts"
    >
      <span v-if="!isProcessing">もっと見る</span>
      <div v-else class="spinner"></div>
    </button>
    <ButtonPostCreate class="mt-12" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostList from '~/components/partials/post/PostList.vue'
import ButtonPostCreate from '~/components/partials/ButtonPostCreate.vue'
import { Post } from '~/types/struct'
import { toUser, toPost } from '~/utils/transformer/toObject'

type LocalData = {
  hasNext: boolean
  isProcessing: boolean
  posts: Post[]
}

export default Vue.extend({
  components: {
    PostList,
    ButtonPostCreate
  },
  async asyncData({ app, params: { userId } }) {
    const postDocuments = await app.$firestore
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .where('userId', '==', userId)
      .get()
    const posts = postDocuments.docs.map(
      (postDocument): Post => {
        return toPost(postDocument)
      }
    )
    const userDocument = await app.$firestore
      .collection('users')
      .doc(userId)
      .get()
    return {
      posts,
      user: toUser(userDocument)
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
