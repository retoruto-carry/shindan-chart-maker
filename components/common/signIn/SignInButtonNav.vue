<template>
  <sign-in>
    <template v-slot:default="{ signIn, isProcessing }">
      <button
        class="bg-transparent text-gray-600 text-sm md:text-base py-1 px-2 border border-gray-600 rounded"
        @click="signIn"
      >
        <template v-if="!isProcessing">
          <i class="mdi mdi-twitter" />
          ログイン
        </template>
        <template v-else>
          <div class="spinner spinner-customize h-6 w-16" />
        </template>
      </button>
    </template>
  </sign-in>
</template>

<script>
import signIn from './SingIn'
export default {
  components: {
    signIn
  }
}
</script>

<style scoped>
/* https://github.com/aniftyco/tailwindcss-spinner */
.spinner-customize::after {
  content: '';
  position: absolute !important;
  top: calc(50% - (1em / 2));
  left: calc(50% - (1em / 2));
  display: block;
  width: 1em;
  height: 1em;
  border: 2px solid theme('colors.gray.600');
  border-radius: 9999px;
  border-right-color: transparent;
  border-top-color: transparent;
  animation: spinAround 500ms infinite linear;
}
</style>
