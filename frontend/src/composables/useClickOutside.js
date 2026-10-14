
import { onMounted, onBeforeUnmount } from 'vue'

export function useClickOutside(elementRef, callback) {
  function handleClick(event) {
    if (elementRef.value && !elementRef.value.contains(event.target)) {
      callback()
    }
  }

  onMounted(() => document.addEventListener('click', handleClick))
  onBeforeUnmount(() => document.removeEventListener('click', handleClick))
}