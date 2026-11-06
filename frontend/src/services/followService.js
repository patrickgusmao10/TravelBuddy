import api from './api'

export function toggleFollow(userId) {
  return api.post(`/users/${userId}/toggle-follow`)
}

export function getFollowers(userId) {
  return api.get(`/users/${userId}/followers`)
}

export function getFollowing(userId) {
  return api.get(`/users/${userId}/following`)
}

export function getFollowingDestinations(page = 1, limit = 12) {
  return api.get('/following-destinations', { params: { page, limit } })
}