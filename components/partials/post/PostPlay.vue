<template>
  <div>
    <template v-if="currentNodeTree.type === 'QUESTION'">
      <p
        class="border border-gray-600 rounded-lg max-w-xl text-lg mb-4 px-2 py-6 mx-auto"
      >
        <span class="whitespace-pre-wrap">{{ currentNodeTree.text }}</span>
      </p>
      <button
        v-for="(choiceNode, index) in currentNodeTree.choiceNodes"
        :key="index"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2 mb-4"
        @click="handleChoiceClicked(index)"
      >
        {{ choiceNode.label }}
      </button>
    </template>
    <template v-else>
      <div class="border border-red-600 rounded-lg max-w-xl mx-auto">
        <p class="text-lg text-white bg-red-600 mb-2 p-2">結果</p>
        <p class="text-2xl text-red-500 font-bold px-2 pt-4 pb-6">
          <span class="whitespace-pre-wrap">{{ currentNodeTree.text }}</span>
        </p>
      </div>
      <button
        class="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto mb-2 mt-8"
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
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { NodeTree, Post } from '~/types/struct'

type LocalData = {
  currentNodeTree: NodeTree | null
}

export default Vue.extend({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },
  data(): LocalData {
    return {
      currentNodeTree: this.post.nodeTree
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
  }
})
</script>
