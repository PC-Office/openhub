import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { searchRepos } from '../api/github.js'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const language = ref('')
  const minStars = ref(0)
  const sortBy = ref('best-match')
  const page = ref(1)
  const results = ref([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref('')

  const totalPages = computed(() => Math.ceil(total.value / 20))

  async function doSearch(newPage = 1) {
    if (!query.value.trim()) return
    loading.value = true
    error.value = ''
    page.value = newPage
    try {
      let q = query.value
      if (language.value) q += ` language:${language.value}`
      if (minStars.value > 0) q += ` stars:>=${minStars.value}`
      const res = await searchRepos({
        q,
        sort: sortBy.value === 'best-match' ? undefined : sortBy.value,
        page: newPage
      })
      results.value = res.data.items || []
      total.value = Math.min(res.data.total_count || 0, 1000) // GitHub API 最多返回1000条
    } catch (e) {
      error.value = e.response?.data?.message || '搜索失败，请稍后重试'
      results.value = []
    } finally {
      loading.value = false
    }
  }

  function reset() {
    query.value = ''
    language.value = ''
    minStars.value = 0
    sortBy.value = 'best-match'
    results.value = []
    total.value = 0
    page.value = 1
  }

  return { query, language, minStars, sortBy, page, results, total, loading, error, totalPages, doSearch, reset }
})
