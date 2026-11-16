import api from './api'

export function getMyCollections() {
  return api.get('/my-collections')
}

export function createCollection(payload) {
  return api.post('/collections', payload, { silent: true })
}

export function getCollectionById(id) {
  return api.get(`/collections/${id}`)
}

export function deleteCollection(id) {
  return api.delete(`/collections/${id}`)
}

export function addDestinationToCollection(collectionId, destinationId) {
  return api.post(`/collections/${collectionId}/destinations`, { destinationId })
}

export function removeDestinationFromCollection(collectionId, destinationId) {
  return api.delete(`/collections/${collectionId}/destinations/${destinationId}`)
}

export function getCollectionsStatus(destinationId) {
  return api.get(`/destinations/${destinationId}/collections-status`)
}