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
  post: Post | null
  user: User | null
  currentNodeTree: NodeTree | null
}

export default Vue.extend({
  async asyncData({ app, params: { id }, error }) {
    const postDocumentData = await app.$firestore
      .collection('posts')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data()
        } else {
          return error({
            statusCode: 404
          })
        }
      })
    const _postDocumentData = (postDocumentData as any) as PostDocumentData
    const post: Post = {
      title: _postDocumentData.title,
      userId: _postDocumentData.userId,
      nodeTree: JSON.parse(_postDocumentData.nodeTree)
    }
    const user = await app.$firestore
      .collection('users')
      .doc(post.userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data()
        } else {
          return error({
            statusCode: 404
          })
        }
      })
    return {
      post,
      user,
      currentNodeTree: post.nodeTree
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
