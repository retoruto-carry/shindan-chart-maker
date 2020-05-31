<template>
  <header>
    <div
      class="bg-white shadow border-b border-gray-200 h-12 md:h-16 flex items-center fixed top-0 inset-x-0 z-100"
    >
      <div
        class="mx-auto w-full max-w-screen-lg flex items-center justify-between px-4 py-2"
      >
        <nuxt-link to="/">
          <span class="text-gray-900 font-bold text-sm md:text-lg">
            診断チャートメーカー
          </span>
        </nuxt-link>
        <client-only>
          <div class="flex items-center">
            <nuxt-link
              to="/posts/create"
              class="align-middle text-gray-700 mr-6"
            >
              <i class="mdi mdi-pencil" />
              <span class="hidden md:inline">作成</span>
            </nuxt-link>
            <account-dropdown
              v-if="$auth.currentUser"
              :photo-url="$auth.currentUser.photoURL"
            />
            <sign-in-button-nav v-else />
          </div>
        </client-only>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import accountDropdown from '~/components/partials/AccountDropdown.vue'
import signInButtonNav from '~/components/common/signIn/SignInButtonNav.vue'

export default Vue.extend({
  name: 'AppNavbar',
  components: {
    accountDropdown,
    signInButtonNav
  },
  methods: {
    handleLogoClicked() {
      this.$router.push('/')
    }
  }
})
</script>

<style scoped>
.z-100 {
  z-index: 100;
}
</style>
