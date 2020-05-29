<template>
  <sign-in>
    <template v-slot:default="{ signIn, isProcessing }">
      <button
        class="bg-transparent text-white text-sm md:text-base py-1 px-2 border border-white rounded"
        @click="signIn"
      >
        <template v-if="!isProcessing">
          <i class="mdi mdi-twitter" />
          ログイン
        </template>
        <template v-else>
          <div class="spinner h-6 w-16" />
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
