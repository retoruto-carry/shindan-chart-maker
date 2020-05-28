<template>
  <div>
    <client-only>
      <slot v-if="!$auth.currentUser" :signIn="signIn" />
    </client-only>
  </div>
</template>

<script>
export default {
  methods: {
    async signIn() {
      const result = await this.$auth.signInWithPopup(
        new this.$firebase.auth.TwitterAuthProvider()
      )
      if (result.user) {
        await this.$firestore
          .collection('users')
          .doc(result.user.uid)
          .set({
            displayName: result.user.displayName,
            photoUrl: result.user.photoURL
          })
        location.reload()
      }
    }
  }
}
</script>
