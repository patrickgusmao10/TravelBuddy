import api from './api'

export function getApiStatus() {
  return api.get('/')
}