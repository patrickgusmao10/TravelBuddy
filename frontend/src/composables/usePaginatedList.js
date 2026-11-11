import { ref, onMounted } from 'vue'
import { PAGE_SIZE } from '../config/constants'
import { useToast } from './useToast'

export function usePaginatedList(fetchPage, limit = PAGE_SIZE) {
  const toast = useToast()

  const items = ref([])
  const page = ref(1)
  const hasMore = ref(true)

  const isLoading = ref(true)
  const isLoadingMore = ref(false)
  const error = ref('')

  async function loadFirstPage() {
    isLoading.value = true
    error.value = ''

    try {
      const response = await fetchPage(1, limit)

      items.value = response.data
      page.value = 1
      hasMore.value = response.data.length === limit
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  async function loadMore() {
    isLoadingMore.value = true
    const nextPage = page.value + 1

    try {
      const response = await fetchPage(nextPage, limit)

      items.value = [...items.value, ...response.data]
      hasMore.value = response.data.length === limit
      page.value = nextPage
    } catch (err) {
      toast.error(err.message)
    } finally {
      isLoadingMore.value = false
    }
  }

  onMounted(loadFirstPage)

  return {
    items,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    reload: loadFirstPage,
  }
}