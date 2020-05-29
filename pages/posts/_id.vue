<template>
  <div>
    <h1 class="text-xl mb-4">{{ post.title }}</h1>
    <template v-if="currentNodeTree.type === 'QUESTION'">
      <p class="text-lg mb-4">{{ currentNodeTree.text }}</p>
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
      <p class="text-2xl text-red-500 font-bold mb-4">
        {{ currentNodeTree.text }}
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
import { NodeTree } from '~/types/struct'

type PostDocumentData = {
  title: string
  nodeTree: string
  userId: string
}

type Post = {
  title: string
  nodeTree: NodeTree
  userId: string
}

type User = {
  id: string
  displayName: string
  photoUrl: string
}

type LocalData = {
  post: Post
  user: User
  currentNodeTree: NodeTree
}

export default Vue.extend({
  async asyncData({ app, params: { id }, error }) {
    const postDocumentData = await app.$firestore
      .collection('posts')
      .doc(id)
      .get()
      .then((doc) => doc.data() as PostDocumentData | undefined)
    if (!postDocumentData) return error({ statusCode: 404 })

    const post: Post = {
      title: postDocumentData.title,
      userId: postDocumentData.userId,
      nodeTree: JSON.parse(postDocumentData.nodeTree)
    }

    const user = await app.$firestore
      .collection('users')
      .doc(post.userId)
      .get()
      .then((doc) => doc.data() as User | undefined)
    if (!user) return error({ statusCode: 404 })

    return {
      post,
      user,
      currentNodeTree: post.nodeTree
    }
  },
  data(): LocalData {
    return {
      post: {
        userId: '',
        title: '',
        nodeTree: {
          text: '',
          type: 'RESULT'
        }
      },
      user: {
        id: '',
        displayName: '',
        photoUrl: ''
      },
      currentNodeTree: {
        text: '',
        type: 'RESULT'
      }
    }
  },
  methods: {
    handleChoiceClicked(index: number): void {
      if (this.currentNodeTree.type === 'QUESTION') {
        this.currentNodeTree = this.currentNodeTree.choiceNodes[index].nodeTree
      }
    },
    handleResetClicked(): void {
      this.currentNodeTree = this.post.nodeTree
    }
  },
  // nuxtのバグっぽい（？）vud.d.tsでthisの型が抜けてる
  // 本来は head: MetaInfo | (this: V) => MetaInfoであってほしい
  head(this: LocalData) {
    const title = `${this.post.title} | 診断チャートメーカー`
    return {
      title,
      meta: [
        { name: 'viewport', hid: 'viewport', content: 'width=1024' },
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

<style scoped>
.HomeGrid {
  grid-template-columns: repeat(4, 220px);
}
</style>
