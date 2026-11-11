import { ref, watch, onMounted } from 'vue'

export function useAsyncData(fetcher, { initialData = null, watch: source = null, immediate = true } = {}) {
  const data = ref(initialData)
  const isLoading = ref(immediate)
  const error = ref('')

  let lastCallId = 0

  async function execute() {
    const callId = ++lastCallId

    isLoading.value = true
    error.value = ''

    try {
      const response = await fetcher()

      if (callId === lastCallId) {
        data.value = response.data
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

  if (source) {
    watch(source, execute, { immediate })
  } else if (immediate) {
    onMounted(execute)
  }

  return { data, isLoading, error, execute }
}