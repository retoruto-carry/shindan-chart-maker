<template>
  <div>
    <h1>Title</h1>
    <p>{{ currentNodeTree.text }}</p>
    <template v-if="currentNodeTree.type === 'QUESTION'">
      <button @click="handleYesClicked">yes</button>
      <button @click="handleNoClicked">no</button>
    </template>
    <template v-else>
      <button @click="handleResetClicked">reset</button>
    </template>
    <hr />
    <p class="text-gray-400">{{ JSON.stringify(currentNodeTree) }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { NodeTree } from '~/types/struct'

type LocalData = {
  nodeTree: NodeTree
  currentNodeTree: NodeTree
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
      type: 'RESULT',
      text: 'result_b'
    }
  },
  no: {
    type: 'RESULT',
    text: 'result_c'
  }
}

export default Vue.extend({
  data(): LocalData {
    return {
      nodeTree: nodeTreeData,
      currentNodeTree: nodeTreeData
    }
  },
  methods: {
    handleYesClicked(): void {
      if (this.currentNodeTree.yes) {
        this.currentNodeTree = this.currentNodeTree.yes
      }
    },
    handleNoClicked(): void {
      if (this.currentNodeTree.no) {
        this.currentNodeTree = this.currentNodeTree.no
      }
    },
    handleResetClicked(): void {
      this.currentNodeTree = nodeTreeData
    }
  }
})
</script>
