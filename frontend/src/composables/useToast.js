import { reactive } from 'vue'
import { TOAST_DURATION_MS } from '../config/constants'

const toasts = reactive([])
let nextId = 1

function remove(id) {
  const index = toasts.findIndex((toast) => toast.id === id)

  if (index !== -1) {
    toasts.splice(index, 1)
  }
}

function show(type, message) {
  const id = nextId++

  toasts.push({ id, type, message })

  setTimeout(() => remove(id), TOAST_DURATION_MS[type])
}

export function useToast() {
  return {
    toasts,
    remove,
    success: (message) => show('success', message),
    info: (message) => show('info', message),
    error: (message) => show('error', message),
  }
}