<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="text-xl font-semibold mb-8">
      <i class="mdi mdi-format-title mr-1" />
      タイトル
    </h2>
    <input
      v-model="postFormData.title"
      required
      class="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-2 px-3 "
      type="text"
      placeholder="タイトルを入力"
      maxlength="100"
    />
    <h2 class="text-xl font-semibold mb-4 mt-8">
      <i class="mdi mdi-sitemap mr-1" />
      フローチャート
    </h2>
    <AppAccordion title="例を見てみよう" class="mb-8">
      <p class="text-left text-gray-500">
        クリックして、テンプレートを下のフローチャートに反映しよう
      </p>
      <div class="text-left mt-2">
        <button
          v-for="(nodeTreeSample, index) in nodeTreeSamples"
          :key="index"
          type="button"
          class="bg-white hover:bg-gray-200 text-gray-600 text-sm py-2 px-4 border border-gray-400 rounded mb-2 mr-4"
          @click="handleSetNodeTree(nodeTreeSample.nodeTree)"
        >
          {{ nodeTreeSample.title }}
        </button>
      </div>
      <p
        class="underline text-gray-600 text-left text-sm cursor-pointer"
        @click="handleResetNodeTree()"
      >
        初期状態へリセット
      </p>
    </AppAccordion>
    <div class="w-full overflow-scroll bg-gray-300 p-4">
      <QuestionNode :node-tree="postFormData.nodeTree" />
    </div>
    <h2 class="text-xl font-semibold mb-4 mt-8">
      <i class="mdi mdi-pound mr-1" />
      ツイッターのタグ
    </h2>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3">
        <i class="mdi mdi-pound" />
      </div>
      <input
        v-model="postFormData.hashtag"
        maxlength="50"
        required
        placeholder="空白不可・_以外の記号不可"
        class="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-3 px-4 mb-3 block pl-10 pr-4 py-2"
      />
    </div>
    <h2 class="text-xl font-semibold mt-8">
      <i class="mdi mdi-tag mr-1" />
      タグ
    </h2>
    <p class="text-gray-500 mb-8">
      サイト内で関連のコンテンツの表示に使います
    </p>
    <InputTags v-model="postFormData.tags" />
    <h2 class="text-xl font-semibold mt-8 mb-4">
      <i class="mdi mdi-format-title mr-1" />
      ひとこと説明
    </h2>
    <input
      v-model="postFormData.subtitle"
      required
      class="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-2 px-3 "
      type="text"
      placeholder="ひとこと説明を入力"
      maxlength="100"
    />
    <button
      type="submit"
      :disabled="isSubmitting"
      class="mt-12 bg-red-500 hover:bg-red-700 text-white font-bold h-12 w-48 rounded-full"
    >
      <span v-if="!isSubmitting">
        {{ submitLabel }}
      </span>
      <div v-else class="spinner"></div>
    </button>
  </form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import AppAccordion from '~/components/common/AppAccordion.vue'
import InputTags from '~/components/partials/post/InputTags.vue'
import QuestionNode from '~/components/partials/QuestionNode.vue'

import { NodeTree, NodeTreeSample, PostFormData } from '~/types/struct'
import { nodeTreeSamples } from '~/utils/constants/nodeTreeSamples'
import { defaultNodeTreeData } from '~/utils/constants/defalutNodeTreeData'

export default Vue.extend({
  components: {
    QuestionNode,
    InputTags,
    AppAccordion
  },
  props: {
    value: {
      type: Object as PropType<PostFormData>,
      required: true
    },
    submitLabel: {
      type: String,
      required: true
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    nodeTreeSamples(): NodeTreeSample[] {
      return nodeTreeSamples
    },
    postFormData: {
      get(): PostFormData {
        return this.value
      },
      set(value: PostFormData) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit')
    },
    handleSetNodeTree(nodeTree: NodeTree) {
      this.postFormData.nodeTree = nodeTree
    },
    handleResetNodeTree() {
      this.postFormData.nodeTree = defaultNodeTreeData
    }
  }
})
</script>
