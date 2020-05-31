<template>
  <div class="text-center">
    <h1 class="text-2xl font-bold mb-8">「{{ post.title }}」を編集</h1>
    <PostForm
      v-model="postFormData"
      :is-submitting="isSubmitting"
      submit-label="更新"
      @submit="handleSubmit"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { DocumentNotExistError } from '~/types/error'
import { PostFormData, TagObj, Post } from '~/types/struct'
import { toPost, toPostFormData } from '~/utils/transformer/toObject'
import PostForm from '~/components/partials/post/PostForm.vue'

type LocalData = {
  post: Post | null
  postFormData: PostFormData | null
  isSubmitting: Boolean
}

export default Vue.extend({
  components: {
    PostForm
  },
  async asyncData({ app, params: { id }, error }) {
    try {
      const postDocument = await app.$firestore
        .collection('posts')
        .doc(id)
        .get()
      const post: Post = toPost(postDocument)
      const postFormData: PostFormData = toPostFormData(post)
      return {
        post,
        postFormData
      }
    } catch (e) {
      if (e instanceof DocumentNotExistError) {
        error({
          statusCode: 404,
          message: 'ページが見つかりませんでした'
        })
      }
    }
  },
  data(): LocalData {
    return {
      post: null,
      postFormData: null,
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
        .doc((this.post as Post).id)
        .set({
          title: this.postFormData.title,
          subtitle: this.postFormData.subtitle,
          nodeTree: JSON.stringify(this.postFormData.nodeTree),
          userId: this.$auth.currentUser.uid,
          hashtag: this.postFormData.hashtag,
          tags: this.postFormData.tags.map((tag: TagObj): string => {
            return tag.text
          }),
          createdAt: (this.post as Post).createdAt
        })
        .then(() => {
          this.$router.push(`/posts/${(this.post as Post).id}`)
        })
    }
  }
})
</script>
