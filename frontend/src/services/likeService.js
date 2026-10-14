import api from './api'

export function toggleLike(destinationId) {
  return api.post(`/destinations/${destinationId}/toggle-like`)
}

export function getLikedDestinations() {
  return api.get('/liked-destinations')
}