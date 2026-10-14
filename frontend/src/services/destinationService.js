
import api from './api'

export function uploadDestination(formData, onUploadProgress) {
  return api.post('/destinations/upload', formData, {
    headers: { 'Content-Type': undefined },
    onUploadProgress,
  })
}

export function getMyDestinations() {
  return api.get('/destinations/my-destinations')
}

export function getDestinationForEdit(id) {
  return api.get(`/destinations/${id}/edit`)
}

export function updateDestination(id, formData) {
  return api.put(`/destinations/${id}`, formData, {
    headers: { 'Content-Type': undefined },
  })
}

export function deleteDestination(id) {
  return api.delete(`/destinations/${id}`)
}