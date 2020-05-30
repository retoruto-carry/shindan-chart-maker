<template>
  <div>
    <client-only>
      <slot
        v-if="!$auth.currentUser"
        :signIn="signIn"
        :isProcessing="isProcessing"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type LocalData = {
  isProcessing: Boolean
}

export default Vue.extend({
  data(): LocalData {
    return {
      isProcessing: false
    }
  },
  methods: {
    async signIn() {
      this.isProcessing = true
      const result = await this.$auth.signInWithPopup(
        new this.$firebase.auth.TwitterAuthProvider()
      )
      if (result.user) {
        await this.$firestore
          .collection('users')
          .doc(result.user.uid)
          .set({
            displayName: result.user.displayName,
            photoUrl: result.user.photoURL as string,
            username: (result.additionalUserInfo as firebase.auth.AdditionalUserInfo)
              .username
          })
        location.reload()
      }
    }
  }
})
</script>
