import api from './api'

export function uploadDestination(formData, onUploadProgress) {
  return api.post('/destinations/upload', formData, {
    headers: { 'Content-Type': undefined },
    onUploadProgress,
  })
}