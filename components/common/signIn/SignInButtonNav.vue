<template>
  <sign-in>
    <template v-slot:default="{ signIn }">
      <button
        class="bg-transparent text-white text-sm md:text-base py-1 px-2 border border-white rounded"
        @click="signIn()"
      >
        <i class="mdi mdi-twitter" />
        ログイン
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
