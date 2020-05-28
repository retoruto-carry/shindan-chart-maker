<template>
  <div class="table text-center bg-gray-300">
    <div class="inline-block rounded mx-4 border border-gray-600 bg-white w-64">
      <div class="border-b border-gray-600">
        <p class="text-sm text-gray-600">{{ displayType(nodeTree.type) }}</p>
      </div>
      <textarea
        v-model="nodeTree.text"
        rows="4"
        required
        class="bg-white border border-gray-300 block w-full h-full text-sm"
        placeholder="テキストを入力"
      />
      <div v-if="nodeTree.type === 'QUESTION'" class="flex content-between">
        <div class="flex-1 text-sm text-red-600">YES</div>
        <div class="flex-1 text-sm text-gray-600">NO</div>
      </div>
      <div v-else class="cursor-pointer" @click="handlePlusClicked">
        <p class="text-xs text-gray-600">+ 分岐を追加</p>
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
import QuestionNode from '~/components/partials/QuestionNode'
import { NodeTree, NodeType } from '~/types/struct'

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
    },
    displayType(type: NodeType): string {
      if (type === 'QUESTION') {
        return '質問'
      } else {
        return '結果'
      }
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
  outline: solid 1px theme('colors.gray.900');
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
  border-top: 0.4rem solid theme('colors.gray.900');
  z-index: 2;
}

/* | | */
.nodes:before {
  border: solid theme('colors.gray.900');
  background-color: theme('colors.gray.300');
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
  outline: solid 0.1rem theme('colors.gray.900');
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
