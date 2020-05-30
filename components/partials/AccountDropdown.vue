<template>
  <client-only>
    <div class="relative group inline-block">
      <button
        class="block h-8 w-8 rounded-full overflow-hidden border border-white focus:outline-none focus:border-white"
      >
        <img
          class="h-full w-full object-cover"
          :src="photoUrl"
          alt="アイコン"
        />
      </button>
      <div>
        <div class="hidden group-hover:block absolute right-0 z-50">
          <div class="mt-2 py-2 w-48 bg-white rounded shadow-xl">
            <nuxt-link
              v-show="$route.path !== '/posts/create'"
              to="/posts/create"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
              <i class="mdi mdi-home mr-1" />
              診断を作成
            </nuxt-link>
            <nuxt-link
              :to="`/users/${$auth.currentUser.uid}/posts`"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
              <i class="mdi mdi-account mr-1" />
              マイページ
            </nuxt-link>
            <a
              class="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:text-gray-900"
              @click="signOut"
            >
              <i class="mdi mdi-logout mr-1" />
              ログアウト
            </a>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    photoUrl: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    async signOut() {
      await this.$auth.signOut()
      location.replace('/')
    }
  }
}
</script>
