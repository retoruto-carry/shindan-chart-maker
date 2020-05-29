<template>
  <div class="text-center">
    <h1 class="text-2xl font-bold mb-8">新しい診断を作成しよう</h1>
    <form @submit.prevent="submitPost">
      <h2 class="text-xl font-semibold mb-1">タイトル</h2>
      <input
        v-model="title"
        class="shadow appearance-none border text-center rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="タイトルを入力"
      />
      <h2 class="text-xl font-semibold mb-1 mt-8">フローチャートを編集</h2>
      <div class="w-full overflow-scroll bg-gray-300 p-4">
        <QuestionNode :node-tree="nodeTree" />
      </div>
      <button
        type="submit"
        class="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold h-12 w-48 rounded-full"
      >
        <span v-if="!isSubmitting">作成</span>
        <div v-else class="spinner"></div>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QuestionNode from '~/components/partials/QuestionNode.vue'
import { NodeTree } from '~/types/struct'

type LocalData = {
  nodeTree: NodeTree
  title: string
  isSubmitting: Boolean
}

const nodeTreeData: NodeTree = {
  type: 'QUESTION',
  text: '',
  choiceNodes: [
    {
      label: '',
      nodeTree: {
        type: 'RESULT',
        text: ''
      }
    },
    {
      label: '',
      nodeTree: {
        type: 'RESULT',
        text: ''
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
      title: '',
      isSubmitting: false
    }
  },
  methods: {
    submitPost() {
      this.isSubmitting = true
      this.$firestore
        .collection('posts')
        .add({
          title: this.title,
          nodeTree: JSON.stringify(this.nodeTree),
          userId: this.$auth.currentUser.uid,
          createdAt: this.$firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((ref) => {
          this.$router.push(`/posts/${ref.id}`)
        })
    }
  }
})
</script>
