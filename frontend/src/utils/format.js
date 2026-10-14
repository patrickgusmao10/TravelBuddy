export function formatDateTime(isoString) {
  return new Date(isoString).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}