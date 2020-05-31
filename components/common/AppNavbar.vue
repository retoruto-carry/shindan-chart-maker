<template>
  <header>
    <div
      class="bg-white shadow border-b border-gray-200 h-16 flex items-center"
    >
      <div
        class="mx-auto w-full max-w-screen-lg flex items-center justify-between px-4 py-2"
      >
        <nuxt-link to="/">
          <span class="text-gray-900 font-bold text-lg"
            >診断チャートメーカー</span
          >
        </nuxt-link>
        <client-only>
          <div class="flex items-center">
            <nuxt-link to="/posts/create" class="align-middle text-gray-700">
              <i class="mdi mdi-pencil" />
              <span class="hidden md:inline">作成</span>
            </nuxt-link>
            <account-dropdown
              v-if="$auth.currentUser"
              :photo-url="$auth.currentUser.photoURL"
              class="ml-6"
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
