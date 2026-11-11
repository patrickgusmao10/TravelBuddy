import api from './api'

export function register(payload) {
  return api.post('/register', payload, { silent: true })
}

export function login(payload) {
  return api.post('/login', payload, { silent: true })
}

export function logout() {
  return api.post('/logout', null, { silent: true })
}