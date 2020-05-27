<template>
  <div>
    <h1>Title</h1>
    <p>{{ nodes[currentNodeIndex].text }}</p>
    <template v-if="!nodes[currentNodeIndex].isEndNode">
      <button @click="handleYesClicked">yes</button>
      <button @click="handleNoClicked">no</button>
    </template>
    <template v-else>
      <button @click="handleResetClicked">reset</button>
    </template>
    <hr />
    <p>{{ JSON.stringify(nodes[currentNodeIndex]) }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export type Node = {
  text: string
  yesIndex: number | null
  noIndex: number | null
  isEndNode: boolean
}

type LocalData = {
  hasNext: boolean
  text: String
  nodes: Node[]
  currentNodeIndex: number
}

export default Vue.extend({
  data(): LocalData {
    return {
      hasNext: true,
      text: 'hoge',
      nodes: [
        {
          text: 'a?',
          yesIndex: 1,
          noIndex: 2,
          isEndNode: false
        },
        {
          text: 'b',
          yesIndex: null,
          noIndex: null,
          isEndNode: true
        },
        {
          text: 'c',
          yesIndex: 3,
          noIndex: 4,
          isEndNode: false
        },
        {
          text: 'd',
          yesIndex: null,
          noIndex: null,
          isEndNode: true
        },
        {
          text: 'e',
          yesIndex: null,
          noIndex: null,
          isEndNode: true
        }
      ],
      currentNodeIndex: 0
    }
  },
  methods: {
    handleYesClicked(): void {
      this.currentNodeIndex = this.nodes[this.currentNodeIndex].yesIndex || 0 // FIXME
    },
    handleNoClicked(): void {
      this.currentNodeIndex = this.nodes[this.currentNodeIndex].noIndex || 0 // FIXME
    },
    handleResetClicked(): void {
      this.currentNodeIndex = 0
    }
  }
})
</script>
