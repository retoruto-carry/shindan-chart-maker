<template>
  <div class="table text-center bg-gray-300">
    <div
      class="inline-block rounded mx-4 border border-gray-600 bg-white w-64"
      :style="{ width: nodeWidth }"
    >
      <div class="border-b border-gray-600">
        <p
          class="text-sm text-gray-600 text-center relative"
          :class="[nodeTree.type === 'QUESTION' ? 'bg-gray-700' : 'bg-red-600']"
        >
          <span class="text-white">
            <i
              v-show="nodeTree.type === 'QUESTION'"
              class="mdi mdi-comment-question-outline"
            />
            {{ displayNodeType(nodeTree.type) }}
          </span>
          <button
            v-show="isShowDeleteButton"
            type="button"
            class="absolute right-0 mr-2 text-white"
            @click="handleDeleteClicked"
          >
            <i class="mdi mdi-trash-can-outline mr-1" />
          </button>
        </p>
      </div>
      <textarea
        v-model="nodeTree.text"
        rows="4"
        required
        class="bg-white border border-gray-300 block w-full h-full text-sm p-1"
        placeholder="テキストを入力"
      />
      <div v-if="nodeTree.type === 'QUESTION'" class="flex content-between">
        <div
          v-for="(choiceNode, index) in nodeTree.choiceNodes"
          :key="index"
          class="flex-1"
        >
          <input
            v-model="choiceNode.label"
            class="border w-full text-gray-700 text-center text-sm"
            type="text"
            required
            :placeholder="`選択肢${index + 1}を入力`"
          />
        </div>
        <button
          type="button"
          class="text-sm bg-gray-200 border border-gray-300 hover:text-white hover:bg-gray-500 rounded-br"
          @click="handleAddChoice"
        >
          <i class="mdi mdi-plus p-1" />
        </button>
      </div>
      <div v-else class="cursor-pointer" @click="handlePlusClicked">
        <button
          type="button"
          class="block w-full text-xs text-gray-700 bg-gray-200 border border-gray-300 hover:text-white hover:bg-gray-500 rounded-b"
        >
          <i class="mdi mdi-plus" />
          分岐を追加
        </button>
      </div>
    </div>
    <div
      v-if="nodeTree.type === 'QUESTION'"
      class="nodes table relative"
      :class="[
        nodeTree.choiceNodes.length === 2
          ? 'before-two-vertical-line'
          : 'before-vertical-line'
      ]"
    >
      <div
        v-for="(choiceNode, index) in nodeTree.choiceNodes"
        :key="index"
        class="node-wrapper table-cell relative"
      >
        <div class="vertical-bar mb-0"></div>
        <div
          class="inline-block text-gray-600 bg-gray-200 rounded-full border border-gray-400 mt-0"
          :style="{ fontSize: '0.5rem', padding: '0.25rem' }"
        >
          {{
            choiceNode.label === '' ? `選択肢${index + 1}` : choiceNode.label
          }}
        </div>
        <QuestionNode
          :node-tree="choiceNode.nodeTree"
          :parent-own-node-length="nodeTree.choiceNodes.length"
          class="node relative"
          @deleteResultNode="handleDeleteNode(index)"
          @convertToResultNode="handleConvertToResultNode(index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { NodeTree, NodeType, ResultNodeTree } from '~/types/struct'

export default Vue.extend({
  name: 'QuestionNode',
  props: {
    nodeTree: {
      type: Object as PropType<NodeTree>,
      required: true
    },
    parentOwnNodeLength: {
      type: Number,
      required: false,
      default: 1
    }
  },
  computed: {
    nodeWidth(): string {
      if (this.nodeTree.type === 'QUESTION') {
        return this.nodeTree.choiceNodes.length !== 1
          ? `${10 * this.nodeTree.choiceNodes.length}rem`
          : '16rem'
      } else {
        return '16rem'
      }
    },
    isShowDeleteButton(): boolean {
      return !(
        this.nodeTree.type === 'RESULT' && this.parentOwnNodeLength === 1
      )
    }
  },
  methods: {
    handlePlusClicked() {
      this.nodeTree.type = 'QUESTION'
      this.$set(this.nodeTree, 'choiceNodes', [
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
      ])
    },
    handleDeleteNode(index: number) {
      if (this.nodeTree.type === 'QUESTION') {
        this.nodeTree.choiceNodes.splice(index, 1)
      }
    },
    handleConvertToResultNode(index: number) {
      if (this.nodeTree.type === 'QUESTION') {
        const newResultNodeTree: ResultNodeTree = {
          type: 'RESULT',
          text: this.nodeTree.text
        }
        this.nodeTree.choiceNodes[index].nodeTree = newResultNodeTree
      }
    },
    handleDeleteClicked() {
      switch (this.nodeTree.type) {
        case 'RESULT':
          return this.$emit('deleteResultNode')
        case 'QUESTION':
          return this.$emit('convertToResultNode')
      }
    },
    handleAddChoice() {
      if (this.nodeTree.type === 'QUESTION') {
        this.nodeTree.choiceNodes.push({
          label: '',
          nodeTree: {
            type: 'RESULT',
            text: ''
          }
        })
      }
    },
    displayNodeType(type: NodeType): string {
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
  margin-top: 1.2rem;
}
.node {
  margin-top: 1.5rem;
}

/* | */
.vertical-bar {
  width: 2px;
  background-color: theme('colors.gray.900');
  margin-right: auto;
  margin-left: auto;
  height: 0.8rem;
}

/* | */
.node:before {
  outline: solid 1px theme('colors.gray.900');
  content: '';
  height: 1.3rem;
  left: 50%;
  position: absolute;
  top: -1.3rem;
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
.before-two-vertical-line:before {
  border: solid theme('colors.gray.900');
  background-color: theme('colors.gray.300');
  z-index: 10;
  border-width: 0px 0.1rem 0px 0.1rem;
  content: '';
  height: 1.2rem;
  width: 4rem;
  left: 50%;
  position: absolute;
  margin-left: -2rem;
  top: -1.1rem;
}

/* | */
.before-vertical-line:before {
  outline: solid 1px theme('colors.gray.900');
  content: '';
  height: 1.2rem;
  width: 0;
  left: 50%;
  position: absolute;
  top: -1.2rem;
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
