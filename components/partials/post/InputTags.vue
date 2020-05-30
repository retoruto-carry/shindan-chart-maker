<template>
  <client-only>
    <vue-tags-input
      v-model="tag"
      :tags="value"
      :autocomplete-items="tagAutocompleteItems"
      :max-tags="4"
      :maxlength="40"
      placeholder="タグを入力してエンター"
      @tags-changed="updateTags"
    />
  </client-only>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TagObj } from '~/types/struct'
import { toTagObj } from '~/utils/transformer/toObject'

const TAG_AUTOCOMPLETE_LIMIT = 5

type LocalData = {
  tag: string
  isTagEditing: boolean
  tagAutocompleteItems: TagObj[]
  debounce: NodeJS.Timeout | null
}

export default Vue.extend({
  name: 'InputTags',
  props: {
    value: {
      type: Array as PropType<TagObj[]>,
      required: true
    }
  },
  data(): LocalData {
    return {
      tag: '',
      isTagEditing: false,
      tagAutocompleteItems: [],
      debounce: null
    }
  },
  watch: {
    tag(_newVal, _oldVal) {
      this.initTagAutocompleteItems()
    }
  },
  methods: {
    updateTags(newTags: TagObj[]) {
      this.tagAutocompleteItems = []
      this.$emit('input', newTags)
    },
    initTagAutocompleteItems(): TagObj[] | void {
      if (this.tag.length < 2) return
      if (this.debounce) clearTimeout(this.debounce)

      this.debounce = setTimeout(async () => {
        // 前方一致検索を文字コードを比較することで実現している
        const tagTextLength: number = this.tag.length
        const strFrontCode: string = this.tag.slice(0, tagTextLength - 1)
        const strEndCode: string = this.tag.slice(
          tagTextLength - 1,
          tagTextLength
        )

        const startCode: string = this.tag
        const endCode: string =
          strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1)

        const tagDocuments = await this.$firestore
          .collection('tags')
          .where('text', '>=', startCode)
          .where('text', '<', endCode)
          .limit(TAG_AUTOCOMPLETE_LIMIT)
          .get()
        this.tagAutocompleteItems = tagDocuments.docs.map(
          (tagDocument): TagObj => {
            return toTagObj(tagDocument)
          }
        )
      }, 600)
    }
  }
})
</script>

<style>
.vue-tags-input {
  max-width: none !important;
}
.vue-tags-input .ti-input {
  padding: 4px 10px;
  border-radius: 0.3rem;
}
.vue-tags-input .ti-tag {
  color: #6c757d;
  background-color: white;
  border-radius: 50rem !important;
  border: 1px solid;
  border-color: #6c757d;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
}
.vue-tags-input .ti-deletion-mark {
  background-color: #dc3545 !important;
  color: #fff;
}
</style>
