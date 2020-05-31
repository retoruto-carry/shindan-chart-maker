<template>
  <div class="text-center">
    <h1 class="text-2xl font-bold mb-8">新しい診断を作成しよう</h1>
    <PostForm
      v-model="postFormData"
      :is-submitting="isSubmitting"
      submit-label="作成"
      @submit="handleSubmit"
    />
    <aside
      v-show="!$auth.currentUser"
      class="w-full h-full fixed left-0 top-0 bg-gray-800 bg-opacity-75 rounded z-50 flex items-center justify-center"
    >
      <div class="bg-white p-10 rounded">
        <p class="font-bold">ログインして診断をつくろう</p>
        <p class="mb-8 mt-1 text-gray-600">作成にはログインが必要です</p>
        <SignInButton class="mb-4" />
        <nuxt-link to="/" class="text-xs underline text-red-600">
          トップへ
        </nuxt-link>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PostFormData, TagObj } from '~/types/struct'
import PostForm from '~/components/partials/post/PostForm.vue'
import SignInButton from '~/components/common/signIn/SignInButton.vue'
import { defaultNodeTreeData } from '~/utils/constants/defalutNodeTreeData'

type LocalData = {
  postFormData: PostFormData | null
  isSubmitting: Boolean
}

export default Vue.extend({
  components: {
    PostForm,
    SignInButton
  },
  data(): LocalData {
    return {
      postFormData: {
        title: '',
        hashtag: '',
        tags: [],
        nodeTree: defaultNodeTreeData
      },
      isSubmitting: false
    }
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true

      this.postFormData = this.postFormData as PostFormData

      this.postFormData.tags = this.postFormData.tags.map(
        (tag: TagObj): TagObj => {
          return {
            text: tag.text.replace(/^#/, '')
          }
        }
      )

      await Promise.all(
        this.postFormData.tags.map(async (tag: TagObj) => {
          await this.$firestore
            .collection('tags')
            .doc(tag.text)
            .set({
              text: tag.text
            })
        })
      )

      this.$firestore
        .collection('posts')
        .add({
          title: this.postFormData.title,
          subtitle: this.postFormData.subtitle,
          nodeTree: JSON.stringify(this.postFormData.nodeTree),
          userId: this.$auth.currentUser.uid,
          hashtag: this.postFormData.hashtag,
          tags: this.postFormData.tags.map((tag: TagObj): string => {
            return tag.text
          }),
          createdAt: this.$firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((ref) => {
          this.$router.push(`/posts/${ref.id}`)
        })
    }
  }
})
</script>
