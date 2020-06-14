<template>
  <div class="table text-center bg-gray-300 mx-auto">
    <div
      class="inline-block rounded mx-4 border border-gray-600 bg-white w-64"
      :style="{ width: width }"
    >
      <div class="border-b border-gray-600">
        <p class="text-sm text-gray-600 text-center relative bg-gray-700">
          <span class="text-white">
            <i class="mdi mdi-comment-question-outline" />
            質問
          </span>
          <button
            v-show="isShowConvertButton"
            type="button"
            class="absolute right-0 mr-2 text-white"
            @click="handleConvertClicked"
          >
            <i class="mdi mdi-trash-can-outline mr-1" />
          </button>
        </p>
      </div>
      <textarea
        :value="questionString"
        rows="4"
        required
        class="bg-white border border-gray-300 block w-full h-full text-sm p-1"
        placeholder="テキストを入力"
        @input="$emit('updateQuestionString', $event.target.value)"
      />
      <div class="flex content-between">
        <div
          v-for="(choiceLabelString, index) in choiceLabelStrings"
          :key="index"
          class="flex-1"
        >
          <input
            :value="choiceLabelString"
            class="border w-full text-gray-700 text-center text-sm"
            type="text"
            required
            :placeholder="`選択肢${index + 1}を入力`"
            @input="updateChoiceLabelString($event.target.value, index)"
          />
        </div>
        <button
          type="button"
          class="text-sm bg-gray-200 border border-gray-300 hover:text-white hover:bg-gray-500 rounded-br"
          @click="handleAddChoiceClicked"
        >
          <i class="mdi mdi-plus p-1" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'QuestionNodeEdit',
  props: {
    width: {
      type: String,
      required: false,
      default: '16rem'
    },
    isShowConvertButton: {
      type: Boolean,
      required: true
    },
    questionString: {
      type: String,
      required: true
    },
    choiceLabelStrings: {
      type: Array as PropType<String[]>,
      required: true
    }
  },
  methods: {
    updateChoiceLabelString(newValue: string, index: number): void {
      const newChoiceLabelStrings = this.choiceLabelStrings
      newChoiceLabelStrings[index] = newValue
      this.$emit('updateChoiceLabelStrings', newChoiceLabelStrings)
    },
    handleConvertClicked(): void {
      this.$emit('convertToResultNode')
    },
    handleAddChoiceClicked(): void {
      this.$emit('addChoice')
    }
  }
})
</script>
