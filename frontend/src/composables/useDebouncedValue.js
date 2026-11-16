import { ref, watch, onUnmounted } from 'vue'

export function useDebouncedValue(source, delay) {
  const debounced = ref(typeof source === 'function' ? source() : source.value)

  let timerId = null

  watch(source, (newValue) => {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      debounced.value = newValue
    }, delay)
  })

  onUnmounted(() => clearTimeout(timerId))

  return debounced
}