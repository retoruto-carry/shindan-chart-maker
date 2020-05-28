<template>
  <div>
    <AppNavbar />
    <div class="container mx-auto px-4 mt-4">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppNavbar from '~/components/common/AppNavbar.vue'

export default Vue.extend({
  components: {
    AppNavbar
  }
})
</script>
