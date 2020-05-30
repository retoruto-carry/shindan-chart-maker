<template>
  <div class="flex align-center flex-col">
    <div
      class="cursor-pointer border border-gray-400 p-2 bg-white inline-block hover:opacity-75 hover:shadow hover:-mb-3 rounded-t"
      @click="handleToggle"
    >
      <p class="text-left text-gray-600">
        <i
          class="mdi mr-1"
          :class="[isOpen ? 'mdi-chevron-right' : 'mdi-chevron-down']"
        />
        {{ title }}
      </p>
    </div>
    <div v-show="isOpen" class="border p-4">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type LocalData = {
  isOpen: Boolean
}

export default Vue.extend({
  name: 'AppAccordion',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data(): LocalData {
    return {
      isOpen: false
    }
  },
  methods: {
    handleToggle() {
      this.isOpen = !this.isOpen
    }
  }
})
</script>
