<template>
  <div class="table text-center bg-gray-300">
    <div
      class="inline-block rounded mx-4 border border-gray-600 bg-white w-64"
      :style="{ width: '16rem' }"
    >
      <div class="border-b border-gray-600">
        <p class="text-sm text-gray-600 text-center relative bg-red-600">
          <span class="text-white">
            結果
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
        :value="value"
        rows="4"
        required
        class="bg-white border border-gray-300 block w-full h-full text-sm p-1"
        placeholder="テキストを入力"
        @input="$emit('input', $event.target.value)"
      />
      <div class="cursor-pointer" @click="handlePlusClicked">
        <button
          type="button"
          class="block w-full text-xs text-gray-700 bg-gray-200 border border-gray-300 hover:text-white hover:bg-gray-500 rounded-b"
        >
          <i class="mdi mdi-plus" />
          分岐を追加
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ResultNodeEdit',
  props: {
    value: {
      type: String,
      required: true
    },
    isShowDeleteButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleDeleteClicked(): void {
      this.$emit('deleteResultNode')
    },
    handleAddChoice(): void {
      this.$emit('addChoice')
    },
    handlePlusClicked(): void {
      this.$emit('convertToQuestionNode')
    }
  }
})
</script>
