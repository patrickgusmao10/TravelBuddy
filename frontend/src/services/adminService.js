import api from './api'
import { PAGE_SIZE } from '../config/constants'

export function getAdminDashboard() {
  return api.get('/admin/dashboard')
}

export function getAdminReports(status, page = 1, limit = PAGE_SIZE) {
  return api.get('/admin/reports', { params: { status, page, limit } })
}

export function reviewAdminReport(id) {
  return api.patch(`/admin/reports/${id}/review`)
}

export function getAdminUsers(search, page = 1, limit = PAGE_SIZE) {
  return api.get('/admin/users', { params: { search, page, limit } })
}

export function setUserBlocked(id, isBlocked) {
  return api.patch(`/admin/users/${id}/block`, { isBlocked })
}

export function getAdminDestinations(search, page = 1, limit = PAGE_SIZE) {
  return api.get('/admin/destinations', { params: { search, page, limit } })
}

export function deleteAdminDestination(id) {
  return api.delete(`/admin/destinations/${id}`)
}