<template>
  <div class="table text-center">
    <div class="inline-block rounded mx-4 border border-gray-600 p-1 w-32">
      <p class="text-gray-700 text-sm h-24">
        {{ nodeTree.text }}
      </p>
      <div
        v-if="nodeTree.type === 'QUESTION'"
        class="flex content-between w-32"
      >
        <div class="flex-1 text-sm text-gray-500">YES</div>
        <div class="flex-1 text-sm text-gray-500">NO</div>
      </div>
      <div v-else class="cursor-pointer" @click="handlePlusClicked">
        <span>+</span>
      </div>
    </div>
    <div v-if="nodeTree.type === 'QUESTION'" class="nodes table relative">
      <div class="node-wrapper table-cell relative">
        <QuestionNode :node-tree="nodeTree.yes" class="node relative" />
      </div>
      <div class="node-wrapper table-cell relative">
        <QuestionNode :node-tree="nodeTree.no" class="node relative" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import QuestionNode from '~/components/QuestionNode'
import { NodeTree } from '~/types/struct'

export default Vue.extend({
  name: 'QuestionNode',
  components: {
    QuestionNode
  },
  props: {
    nodeTree: {
      type: Object as PropType<NodeTree>,
      required: true
    }
  },
  methods: {
    handlePlusClicked() {
      this.nodeTree.type = 'QUESTION'
      this.$set(this.nodeTree, 'yes', {
        type: 'RESULT',
        text: 'result_default'
      })
      this.$set(this.nodeTree, 'no', {
        type: 'RESULT',
        text: 'result_default'
      })
    }
  }
})
</script>

<style scoped>
.nodes {
  margin-top: 1rem;
}
.node {
  margin-top: 1rem;
}

/* | */
.node:before {
  outline: solid 1px #666;
  content: '';
  height: 1rem;
  left: 50%;
  position: absolute;
  top: -1rem;
}

/* ▼ */
.node:after {
  content: '';
  position: absolute;
  top: -0.4rem;
  left: 50%;
  margin-left: -0.4rem;
  border: 0.4rem solid transparent;
  border-top: 0.4rem solid #666;
  z-index: 2;
}

/* | | */
.nodes:before {
  border: solid #666;
  background-color: white;
  z-index: 1000;
  border-width: 0px 0.1rem 0px 0.1rem;
  content: '';
  height: 1.1rem;
  width: 4rem;
  left: 50%;
  position: absolute;
  margin-left: -2rem;
  top: -1rem;
}

/* ___ */
.node-wrapper:before {
  outline: solid 0.1rem #666;
  content: '';
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.node-wrapper:first-child:before {
  left: 50%;
}
.node-wrapper:last-child:before {
  right: 50%;
}
</style>
