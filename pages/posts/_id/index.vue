<template>
  <div class="text-center">
    <div class="border border-gray-400 rounded py-8 px-4">
      <h1 class="text-3xl mb-2">{{ post.title }}</h1>
      <p class="text-gray-800 mb-2">{{ post.subtitle }}</p>
      <p class="text-gray-600 text-sm">
        作者：<nuxt-link :to="`/users/${user.id}/posts`" class="underline">
          {{ user.displayName }}
        </nuxt-link>
        <a
          :href="`https://twitter.com/${user.username}`"
          target="__blank"
          class="text-blue-500 ml-1"
        >
          <i class="mdi mdi-twitter " />
        </a>
      </p>
      <button
        v-if="$auth.currentUser && post.userId === $auth.currentUser.uid"
        class="block mx-auto bg-transparent hover:bg-gray-600 text-gray-600 text-xs hover:text-white py-1 px-4 border border-gray-600 hover:border-transparent rounded mt-4"
        @click="$router.push(`/posts/${post.id}/edit`)"
      >
        <i class="mdi mdi-pencil" />
        この診断を編集
      </button>

      <div v-show="!isPlaying" class="mt-8">
        <button
          class="text-2xl bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 rounded-full mr-1 mb-2"
          @click="handleStartClicked()"
        >
          診断スタート
        </button>
        <button
          class="block text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-auto mt-8"
          @click="handleTweetPostClicked()"
        >
          <i class="mdi mdi-twitter mr-1" />
          ツイート
        </button>
      </div>
      <PostPlay v-show="isPlaying" :post="post" class="mt-8" />
    </div>

    <ButtonPostCreate class="mt-12" />

    <template v-if="relatedPosts.length">
      <h2 class="text-xl font-bold mt-12">関連一覧</h2>
      <PostList :posts="relatedPosts" class="mt-2" />
    </template>

    <PostListRecent class="mt-12" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { DocumentNotExistError } from '~/types/error'
import { User, Post } from '~/types/struct'
import { toUser, toPost } from '~/utils/transformer/toObject'
import PostList from '~/components/partials/post/PostList.vue'
import PostPlay from '~/components/partials/post/PostPlay.vue'
import PostListRecent from '~/components/partials/post/PostListRecent.vue'
import ButtonPostCreate from '~/components/partials/ButtonPostCreate.vue'

type LocalData = {
  post: Post | null
  user: User | null
  relatedPosts: Post[]
  isPlaying: Boolean
}

export default Vue.extend({
  components: {
    PostListRecent,
    ButtonPostCreate,
    PostList,
    PostPlay
  },
  async asyncData({ app, params: { id }, error }) {
    try {
      const postDocument = await app.$firestore
        .collection('posts')
        .doc(id)
        .get()
      const post = toPost(postDocument)
      const userDocument = await app.$firestore
        .collection('users')
        .doc(post.userId)
        .get()
      let relatedPosts: Post[]
      if (post.tags.length) {
        const relatedPostDocuments = await app.$firestore
          .collection('posts')
          .where('tags', 'array-contains-any', post.tags)
          .get()
        relatedPosts = relatedPostDocuments.docs
          .map(
            (postDocument): Post => {
              return toPost(postDocument)
            }
          )
          .filter((p: Post) => p.id !== post.id)
      } else {
        relatedPosts = []
      }
      return {
        post,
        relatedPosts,
        user: toUser(userDocument),
        currentNodeTree: post.nodeTree
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
      relatedPosts: [],
      user: null,
      isPlaying: false
    }
  },
  methods: {
    handleStartClicked(): void {
      this.isPlaying = true
    },
    handleTweetPostClicked(): void {
      const post = this.post! as Post
      const tweet: string =
        'https://twitter.com/intent/tweet?url=' +
        encodeURIComponent(`${process.env.BASE_URL}/posts/${post.id}`) +
        '&text=' +
        encodeURIComponent(
          `${post.title}\r\n#${post.hashtag} #診断チャートメーカー`
        )
      window.open(tweet)
    }
  },
  head() {
    const post = this.post! as Post
    const title = `${post.title} | 診断チャートメーカー`
    return {
      title,
      meta: [
        { property: 'og:title', hid: 'og:title', content: title },
        {
          property: 'og:url',
          hid: 'og:url',
          content: `${process.env.BASE_URL}/posts/${post.id}`
        },
        { name: 'twitter:title', hid: 'twitter:title', content: title },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${process.env.OGP_API_URL}?title=${post.title}`
        }
      ]
    }
  }
})
</script>
