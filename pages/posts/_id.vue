<template>
  <div class="text-center">
    <h1 class="text-xl">{{ post.title }}</h1>
    <p class="text-gray-600 text-sm mt-1 mb-4">作者：{{ user.displayName }}</p>
    <template v-if="currentNodeTree.type === 'QUESTION'">
      <p class="text-lg mb-4 whitespace-pre-wrap">{{ currentNodeTree.text }}</p>
      <button
        v-for="(choiceNode, index) in currentNodeTree.choiceNodes"
        :key="index"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-1 mb-2"
        @click="handleChoiceClicked(index)"
      >
        {{ choiceNode.label }}
      </button>
    </template>
    <template v-else>
      <p class="text-lg mb-2">結果</p>
      <p class="text-2xl text-red-500 font-bold mb-8">
        <span class="whitespace-pre-wrap">{{ currentNodeTree.text }}</span>
      </p>
      <button
        class="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto mb-2"
        @click="handleTweetResultClicked"
      >
        <i class="mdi mdi-twitter mr-1" />
        結果をツイート
      </button>
      <button
        class="block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-auto"
        @click="handleResetClicked"
      >
        <i class="mdi mdi-refresh mr-1" />
        最初から
      </button>
    </template>

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
import { DocumentNotExistError } from '../../types/error'
import { NodeTree, User, Post } from '~/types/struct'
import { toUser, toPost } from '~/utils/transformer/toObject'
import PostList from '~/components/partials/post/PostList.vue'
import PostListRecent from '~/components/partials/post/PostListRecent.vue'
import ButtonPostCreate from '~/components/partials/ButtonPostCreate.vue'

type LocalData = {
  post: Post | null
  user: User | null
  relatedPosts: Post[]
  currentNodeTree: NodeTree | null
}

export default Vue.extend({
  components: {
    PostListRecent,
    ButtonPostCreate,
    PostList
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
      const relatedPostDocuments = await app.$firestore
        .collection('posts')
        .where('tags', 'array-contains-any', post.tags)
        .get()
      const relatedPosts = relatedPostDocuments.docs
        .map(
          (postDocument): Post => {
            return toPost(postDocument)
          }
        )
        .filter((p: Post) => p.id !== post.id)
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
      currentNodeTree: null
    }
  },
  methods: {
    handleChoiceClicked(index: number): void {
      const currentNodeTree = this.currentNodeTree! as NodeTree
      if (currentNodeTree.type === 'QUESTION') {
        this.currentNodeTree = currentNodeTree.choiceNodes[index].nodeTree
      }
    },
    handleResetClicked(): void {
      const post = this.post! as Post
      this.currentNodeTree = post.nodeTree
    },
    handleTweetResultClicked(): void {
      const currentNodeTree = this.currentNodeTree! as NodeTree
      const post = this.post! as Post
      const tweet: string =
        'https://twitter.com/intent/tweet?url=' +
        encodeURIComponent(`${process.env.BASE_URL}/posts/${post.id}`) +
        '&text=' +
        encodeURIComponent(
          `【結果】\r\n${currentNodeTree.text}\r\n\r\n「${post.title}」で遊びました\r\n#${post.hashtag} #診断チャートメーカー`
        )
      window.open(tweet)
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
