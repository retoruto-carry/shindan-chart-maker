<template>
  <div>
    <p class="text-sm text-gray-600">超簡単♪</p>
    <p class="text-gray-700 mb-1">あなたも診断を作ってみよう</p>
    <button
      class="block mx-auto bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded"
      @click="$router.push('/posts/create')"
    >
      <i class="mdi mdi-pencil mr-1" />
      診断をつくる
    </button>
  </div>
</template>
