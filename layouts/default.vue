<template>
  <div>
    <AppNavbar />
    <div class="container max-w-screen-lg mx-auto px-4 mt-8">
      <nuxt />
    </div>
    <TheFooter class="mt-24" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppNavbar from '~/components/common/AppNavbar.vue'
import TheFooter from '~/components/common/TheFooter.vue'

export default Vue.extend({
  components: {
    AppNavbar,
    TheFooter
  }
})
</script>
