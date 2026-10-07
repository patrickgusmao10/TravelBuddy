import api from './api'

export function getMyProfile() {
  return api.get('/profile/me')
}

export function updateProfile(formData) {
  return api.put('/profile/me', formData, {
    headers: { 'Content-Type': undefined },
  })
}

export function getDestinationById(id) {
  return api.get(`/destinations/${id}`)
}

export function getFeed(page = 1, limit = 12) {
  return api.get('/feed', {
    params: { page, limit },
  })
}