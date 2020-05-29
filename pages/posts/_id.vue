<template>
  <div class="text-center">
    <h1 class="text-xl">{{ post.title }}</h1>
    <p class="text-gray-600 text-sm mt-1 mb-4">作者：{{ user.displayName }}</p>
    <template v-if="currentNodeTree.type === 'QUESTION'">
      <p class="text-lg mb-4 whitespace-pre-wrap">{{ currentNodeTree.text }}</p>
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-1"
        @click="handleChoiceClicked(0)"
      >
        {{ currentNodeTree.choiceNodes[0].label }}
      </button>
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        @click="handleChoiceClicked(1)"
      >
        {{ currentNodeTree.choiceNodes[1].label }}
      </button>
    </template>
    <template v-else>
      <p class="text-lg mb-2">結果</p>
      <p class="text-2xl text-red-500 font-bold mb-8">
        <span class="whitespace-pre-wrap">{{ currentNodeTree.text }}</span>
      </p>
      <button
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        @click="handleResetClicked"
      >
        最初から
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { DocumentNotExistError } from '../../types/error'
import { NodeTree, User, Post } from '~/types/struct'
import { toUser, toPost } from '~/utils/transformer/toObject'

type LocalData = {
  post: Post | null
  user: User | null
  currentNodeTree: NodeTree | null
}

export default Vue.extend({
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
      return {
        post,
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
          content: 'TODO: INPUT '
        },
        { name: 'twitter:title', hid: 'twitter:title', content: title }
      ]
    }
  }
})
</script>
