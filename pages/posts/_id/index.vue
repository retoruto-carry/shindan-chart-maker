<template>
  <div class="text-center">
    <h1 class="text-3xl">{{ post.title }}</h1>
    <p class="text-gray-600 text-sm mt-1 mb-8">作者：{{ user.displayName }}</p>
    <button
      v-show="!isPlaying"
      class="text-2xl bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-1 mb-2"
      @click="handleStartClicked()"
    >
      診断スタート
    </button>
    <PostPlay v-show="isPlaying" :post="post" />

    <ButtonPostCreate class="mt-24" />

    <template v-if="relatedPosts.length">
      <h2 class="text-xl font-bold mt-12">関連一覧</h2>
      <PostList :posts="relatedPosts" class="mt-2" />
    </template>

    <PostListRecent class="mt-12" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { DocumentNotExistError } from '~/types/error'
import { User, Post } from '~/types/struct'
import { toUser, toPost } from '~/utils/transformer/toObject'
import PostList from '~/components/partials/post/PostList.vue'
import PostPlay from '~/components/partials/post/PostPlay.vue'
import PostListRecent from '~/components/partials/post/PostListRecent.vue'
import ButtonPostCreate from '~/components/partials/ButtonPostCreate.vue'

type LocalData = {
  post: Post | null
  user: User | null
  relatedPosts: Post[]
  isPlaying: Boolean
}

export default Vue.extend({
  components: {
    PostListRecent,
    ButtonPostCreate,
    PostList,
    PostPlay
  },
  async asyncData({ app, params: { id }, error }) {
    try {
      const postDocument = await app.$firestore
        .collection('posts')
        .doc(id)
        .get()
      const post = toPost(postDocument)
      const userDocument = await app.$firestore
        .collection('users')
        .doc(post.userId)
        .get()
      let relatedPosts: Post[]
      if (post.tags.length) {
        const relatedPostDocuments = await app.$firestore
          .collection('posts')
          .where('tags', 'array-contains-any', post.tags)
          .get()
        relatedPosts = relatedPostDocuments.docs
          .map(
            (postDocument): Post => {
              return toPost(postDocument)
            }
          )
          .filter((p: Post) => p.id !== post.id)
      } else {
        relatedPosts = []
      }
      return {
        post,
        relatedPosts,
        user: toUser(userDocument),
        currentNodeTree: post.nodeTree
      }
    } catch (e) {
      if (e instanceof DocumentNotExistError) {
        error({
          statusCode: 404,
          message: 'ページが見つかりませんでした'
        })
      }
    }
  },
  data(): LocalData {
    return {
      post: null,
      relatedPosts: [],
      user: null,
      isPlaying: false
    }
  },
  methods: {
    handleStartClicked() {
      this.isPlaying = true
    }
  },
  head() {
    const post = this.post! as Post
    const title = `${post.title} | 診断チャートメーカー`
    return {
      title,
      meta: [
        { property: 'og:title', hid: 'og:title', content: title },
        {
          property: 'og:url',
          hid: 'og:url',
          content: `${process.env.BASE_URL}/posts/${post.id}`
        },
        { name: 'twitter:title', hid: 'twitter:title', content: title }
      ]
    }
  }
})
</script>
