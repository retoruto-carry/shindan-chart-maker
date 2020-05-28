<template>
  <div>
    <h1>Title</h1>
    <p>{{ currentNodeTree.text }}</p>
    <template v-if="currentNodeTree.type === 'QUESTION'">
      <button @click="handleChoiceClicked(0)">
        {{ currentNodeTree.choiceNodes[0].label }}
      </button>
      <button @click="handleChoiceClicked(1)">
        {{ currentNodeTree.choiceNodes[1].label }}
      </button>
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
  text: '質問その１',
  choiceNodes: [
    {
      label: 'はい',
      nodeTree: {
        type: 'RESULT',
        text: '結果その１'
      }
    },
    {
      label: 'いいえ',
      nodeTree: {
        type: 'QUESTION',
        text: '質問その２',
        choiceNodes: [
          {
            label: 'はい',
            nodeTree: {
              type: 'RESULT',
              text: '結果その２'
            }
          },
          {
            label: 'いいえ',
            nodeTree: {
              type: 'RESULT',
              text: '結果その３'
            }
          }
        ]
      }
    }
  ]
}

export default Vue.extend({
  data(): LocalData {
    return {
      nodeTree: nodeTreeData,
      currentNodeTree: nodeTreeData
    }
  },
  methods: {
    handleChoiceClicked(index: number): void {
      if (this.currentNodeTree.type === 'QUESTION') {
        this.currentNodeTree = this.currentNodeTree.choiceNodes[index].nodeTree
      }
    },
    handleResetClicked(): void {
      this.currentNodeTree = nodeTreeData
    }
  }
})
</script>
