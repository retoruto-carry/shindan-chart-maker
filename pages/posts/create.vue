<template>
  <div class="text-center">
    <h1 class="text-2xl font-bold mb-8">新しい診断を作成しよう</h1>
    <form @submit.prevent="submitPost">
      <h2 class="text-xl font-semibold mb-8">
        <i class="mdi mdi-format-title mr-1" />
        タイトル
      </h2>
      <input
        v-model="title"
        required
        class="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-2 px-3 "
        type="text"
        placeholder="タイトルを入力"
        maxlength="100"
      />
      <h2 class="text-xl font-semibold mb-4 mt-8">
        <i class="mdi mdi-sitemap mr-1" />
        フローチャート
      </h2>
      <div class="w-full overflow-scroll bg-gray-300 p-4">
        <QuestionNode :node-tree="nodeTree" />
      </div>
      <h2 class="text-xl font-semibold mb-4 mt-8">
        <i class="mdi mdi-pound mr-1" />
        ツイッターのタグ
      </h2>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="mdi mdi-pound" />
        </div>
        <input
          v-model="hashtag"
          maxlength="50"
          required
          placeholder="空白不可・_以外の記号不可"
          class="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-3 px-4 mb-3 block pl-10 pr-4 py-2"
        />
      </div>
      <h2 class="text-xl font-semibold mt-8">
        <i class="mdi mdi-tag mr-1" />
        タグ
      </h2>
      <p class="text-gray-500 mb-4">
        サイト内で関連のコンテンツの表示に使います
      </p>
      <InputTags v-model="tags" />
      <button
        type="submit"
        class="mt-12 bg-red-500 hover:bg-red-700 text-white font-bold h-12 w-48 rounded-full"
      >
        <span v-if="!isSubmitting">
          <i class="mdi mdi-plus mr-1 text-lg" />
          作成
        </span>
        <div v-else class="spinner"></div>
      </button>
    </form>
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
import InputTags from '~/components/partials/post/InputTags.vue'
import QuestionNode from '~/components/partials/QuestionNode.vue'
import SignInButton from '~/components/common/signIn/SignInButton.vue'
import { NodeTree, TagObj } from '~/types/struct'

type LocalData = {
  nodeTree: NodeTree
  title: string
  hashtag: string
  tags: TagObj[]
  isSubmitting: Boolean
}

const nodeTreeData: NodeTree = {
  type: 'QUESTION',
  text: '',
  choiceNodes: [
    {
      label: '',
      nodeTree: {
        type: 'RESULT',
        text: ''
      }
    },
    {
      label: '',
      nodeTree: {
        type: 'RESULT',
        text: ''
      }
    }
  ]
}

export default Vue.extend({
  components: {
    QuestionNode,
    SignInButton,
    InputTags
  },
  data(): LocalData {
    return {
      nodeTree: nodeTreeData,
      title: '',
      hashtag: '',
      tags: [],
      isSubmitting: false
    }
  },
  methods: {
    async submitPost() {
      this.isSubmitting = true

      this.tags = this.tags.map(
        (tag: TagObj): TagObj => {
          return {
            text: tag.text.replace(/^#/, '')
          }
        }
      )

      await Promise.all(
        this.tags.map(async (tag: TagObj) => {
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
          title: this.title,
          nodeTree: JSON.stringify(this.nodeTree),
          userId: this.$auth.currentUser.uid,
          hashtag: this.hashtag,
          tags: this.tags.map((tag: TagObj): string => {
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
