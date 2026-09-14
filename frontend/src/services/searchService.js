import api from './api'

export function search(query) {
  return api.get('/search', {
    params: { q: query },
  })
}