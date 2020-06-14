<template>
  <div class="table text-center bg-gray-300">
    <template v-if="nodeTree.type === 'RESULT'">
      <ResultNodeEdit
        v-model="nodeTree.text"
        :is-show-delete-button="parentOwnNodeLength !== 1"
        @deleteResultNode="handleDeleteResultNode"
        @convertToQuestionNode="handleConvertToQuestionNode"
      />
    </template>
    <template v-if="nodeTree.type === 'QUESTION'">
      <QuestionNodeEdit
        :width="questionNodeWidth(nodeTree)"
        :question-string="nodeTree.text"
        :choice-label-strings="nodeTree.choiceNodes.map((a) => a.label)"
        :is-show-convert-button="!isRoot"
        @updateQuestionString="(v) => (nodeTree.text = v)"
        @updateChoiceLabelStrings="handleUpdateChoiceLabelStrings"
        @convertToResultNode="handleConvertToResultNode"
        @addChoice="handleAddChoice"
      />
      <div
        class="nodes table relative"
        :class="choiceNodesWrapperClass(nodeTree)"
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
          <NodeTreeEdit
            :node-tree="choiceNode.nodeTree"
            :parent-own-node-length="nodeTree.choiceNodes.length"
            class="node relative"
            @deleteResultNode="handleDeleteResultNodeFromChild(index)"
            @convertToResultNode="handleConvertToResultNodeFromChild(index)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { NodeTree, ResultNodeTree, QuestionNodeTree } from '~/types/struct'
import QuestionNodeEdit from '~/components/partials/NodeTreeEditor/QustionNodeEdit.vue'
import ResultNodeEdit from '~/components/partials/NodeTreeEditor/ResultNodeEdit.vue'

export default Vue.extend({
  name: 'NodeTreeEdit',
  components: {
    QuestionNodeEdit,
    ResultNodeEdit
  },
  props: {
    isRoot: {
      type: Boolean,
      required: false,
      default: false
    },
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
  methods: {
    choiceNodesWrapperClass(questionNodeTree: QuestionNodeTree): string {
      return questionNodeTree.choiceNodes.length === 2
        ? 'before-two-vertical-line'
        : 'before-vertical-line'
    },
    questionNodeWidth(questionNodeTree: QuestionNodeTree): string {
      return questionNodeTree.choiceNodes.length === 1
        ? '16rem'
        : `${10 * questionNodeTree.choiceNodes.length}rem`
    },
    handleDeleteResultNode(): void {
      this.$emit('deleteResultNode')
    },
    handleDeleteResultNodeFromChild(index: number): void {
      if (this.nodeTree.type === 'QUESTION') {
        this.nodeTree.choiceNodes.splice(index, 1)
      }
    },
    handleConvertToQuestionNode(): void {
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
    handleUpdateChoiceLabelStrings(labelStrings: string[]): void {
      labelStrings.forEach((str, index) => {
        if (this.nodeTree.type === 'QUESTION') {
          this.nodeTree.choiceNodes[index].label = str
        }
      })
    },
    handleConvertToResultNode() {
      return this.$emit('convertToResultNode')
    },
    handleConvertToResultNodeFromChild(index: number) {
      if (this.nodeTree.type === 'QUESTION') {
        const newResultNodeTree: ResultNodeTree = {
          type: 'RESULT',
          text: this.nodeTree.choiceNodes[index].nodeTree.text
        }
        this.nodeTree.choiceNodes[index].nodeTree = newResultNodeTree
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
