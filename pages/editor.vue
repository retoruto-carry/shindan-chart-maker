<template>
  <div>
    <h1>Editor</h1>
    <QuestionNode :node-tree="nodeTree" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QuestionNode from '~/components/QuestionNode'
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
