<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">新しい診断を作成しよう</h1>
    <form @submit.prevent="submitPost">
      <h2 class="text-2xl font-semibold mb-1">タイトル</h2>
      <input
        v-model="title"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="タイトルを入力"
      />
      <h2 class="text-2xl font-semibold mb-1 mt-4">フローチャートを編集</h2>
      <div class="w-full overflow-scroll bg-gray-300 p-4">
        <QuestionNode :node-tree="nodeTree" />
      </div>
      <button
        type="submit"
        class="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full"
      >
        作成
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QuestionNode from '~/components/partials/QuestionNode'
import { NodeTree } from '~/types/struct'

type LocalData = {
  nodeTree: NodeTree
  title: string
}

const nodeTreeData: NodeTree = {
  type: 'QUESTION',
  text: '',
  choiceNodes: [
    {
      label: '',
      nodeTree: {
        type: 'RESULT',
        text: 'result_a'
      }
    },
    {
      label: '',
      nodeTree: {
        type: 'RESULT',
        text: 'result_b'
      }
    }
  ]
}

export default Vue.extend({
  components: {
    QuestionNode
  },
  data(): LocalData {
    return {
      nodeTree: nodeTreeData,
      title: ''
    }
  },
  methods: {
    submitPost() {
      this.$firestore.collection('posts').add({
        title: this.title,
        nodeTree: JSON.stringify(this.nodeTree),
        userId: this.$auth.currentUser.uid
      })
    }
  }
})
</script>
