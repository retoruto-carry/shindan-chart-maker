<template>
  <header>
    <div class="bg-red-700 flex items-center justify-between px-4 py-1 h-12">
      <p class="text-white font-bold">診断チャートメーカー</p>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppNavbar',
  methods: {
    handleLogoClicked() {
      this.$router.push('/')
    }
  }
})
</script>
