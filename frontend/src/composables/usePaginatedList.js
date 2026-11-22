import { ref, watch, onMounted } from 'vue'
import { PAGE_SIZE } from '../config/constants'
import { useToast } from './useToast'

export function usePaginatedList(fetchPage, limit = PAGE_SIZE, { watch: source = null } = {}) {
  const toast = useToast()

  const items = ref([])
  const page = ref(1)
  const hasMore = ref(true)

  const isLoading = ref(true)
  const isLoadingMore = ref(false)
  const error = ref('')

  let lastCallId = 0

  async function loadFirstPage() {
    const callId = ++lastCallId

    isLoading.value = true
    error.value = ''

    try {
      const response = await fetchPage(1, limit)

      if (callId === lastCallId) {
        items.value = response.data
        page.value = 1
        hasMore.value = response.data.length === limit
      }
    } catch (err) {
      if (callId === lastCallId) {
        error.value = err.message
      }
    } finally {
      if (callId === lastCallId) {
        isLoading.value = false
      }
    }
  }

  async function loadMore() {
    const callId = lastCallId

    isLoadingMore.value = true
    const nextPage = page.value + 1

    try {
      const response = await fetchPage(nextPage, limit)

      if (callId === lastCallId) {
        items.value = [...items.value, ...response.data]
        hasMore.value = response.data.length === limit
        page.value = nextPage
      }
    } catch (err) {
      if (callId === lastCallId) {
        toast.error(err.message)
      }
    } finally {
      isLoadingMore.value = false
    }
  }

  if (source) {
    watch(source, loadFirstPage)
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