import api from './api'
import { PAGE_SIZE } from '../config/constants'

export function getMyProfile() {
  return api.get('/profile/me')
}

export function updateProfile(formData) {
  return api.put('/profile/me', formData, {
    headers: { 'Content-Type': undefined },
    silent: true,
  })
}

export function getDestinationById(id) {
  return api.get(`/destinations/${id}`)
}

export function getFeed(page = 1, limit = PAGE_SIZE) {
  return api.get('/feed', {
    params: { page, limit },
  })
}

export function getPublicProfile(username) {
  return api.get(`/profile/${encodeURIComponent(username)}`)
}