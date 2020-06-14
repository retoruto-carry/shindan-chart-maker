<template>
  <NodeTreeEdit :node-tree="nodeTree" :is-root="true" />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { NodeTree } from '~/types/struct'
import NodeTreeEdit from '~/components/partials/NodeTreeEditor/NodeTreeEdit.vue'

export default Vue.extend({
  name: 'NodeTreeEditor',
  components: {
    NodeTreeEdit
  },
  props: {
    nodeTree: {
      type: Object as PropType<NodeTree>,
      required: true
    }
  }
})
</script>
