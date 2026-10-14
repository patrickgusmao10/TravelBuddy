import api from './api'

export function getComments(destinationId) {
  return api.get(`/destinations/${destinationId}/comments`)
}

export function addComment(destinationId, content) {
  return api.post(`/destinations/${destinationId}/comments`, { content })
}