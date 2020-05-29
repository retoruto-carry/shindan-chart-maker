<template>
  <header>
    <div class="bg-red-700">
      <div
        class="mx-auto max-w-screen-lg flex items-center justify-between px-4 py-1 h-12"
      >
        <nuxt-link to="/">
          <span class="text-white font-bold">診断チャートメーカー</span>
        </nuxt-link>
        <client-only>
          <div class="flex items-center">
            <nuxt-link to="/posts/create" class="text-white align-middle mr-4">
              <i class="mdi mdi-pencil" />
              作成
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
