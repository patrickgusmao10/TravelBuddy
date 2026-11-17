import api from './api'

export function reportDestination(destinationId, reason) {
  return api.post(`/destinations/${destinationId}/report`, { reason }, { silent: true })
}