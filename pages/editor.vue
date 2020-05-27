<template>
  <div>
    <h1>Editor</h1>
    <QuestionNode :node-tree="nodeTree" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QuestionNode from '~/components/QuestionNode'

export type NodeTree = {
  text: string
  yes?: NodeTree
  no?: NodeTree
  type: String
}

type LocalData = {
  nodeTree: NodeTree
}

const nodeTreeData: NodeTree = {
  type: 'Question',
  text: 'a?',
  yes: {
    type: 'Question',
    text: 'b?',
    yes: {
      type: 'Result',
      text: 'result_a'
    },
    no: {
      type: 'Question',
      text: 'b?',
      yes: {
        type: 'Result',
        text: 'result_v'
      },
      no: {
        type: 'Result',
        text: 'result_x'
      }
    }
  },
  no: {
    type: 'Result',
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
