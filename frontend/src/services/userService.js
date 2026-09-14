import api from './api'

export function getMyProfile() {
  return api.get('/profile/me')
}

export function updateProfile(formData) {
  return api.put('/profile/me', formData, {
    headers: { 'Content-Type': undefined },
  })
}