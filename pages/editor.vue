<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Editor</h1>
    <h2 class="text-2xl font-semibold mb-1">フローチャートを編集</h2>
    <div class="w-full overflow-scroll bg-gray-300 p-4">
      <QuestionNode :node-tree="nodeTree" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QuestionNode from '~/components/partials/QuestionNode'
import { NodeTree } from '~/types/struct'

type LocalData = {
  nodeTree: NodeTree
}

const nodeTreeData: NodeTree = {
  type: 'QUESTION',
  text: 'a?',
  yes: {
    type: 'QUESTION',
    text: 'b?',
    yes: {
      type: 'RESULT',
      text: 'result_a'
    },
    no: {
      type: 'QUESTION',
      text: 'b?',
      yes: {
        type: 'RESULT',
        text: 'result_v'
      },
      no: {
        type: 'RESULT',
        text: 'result_x'
      }
    }
  },
  no: {
    type: 'RESULT',
    text: 'result_hoge'
  }
}

export default Vue.extend({
  components: {
    QuestionNode
  },
  data(): LocalData {
    return {
      nodeTree: nodeTreeData
    }
  },
  methods: {}
})
</script>
