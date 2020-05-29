<template>
  <sign-in>
    <template v-slot:default="{ signIn }">
      <button
        class="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
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
