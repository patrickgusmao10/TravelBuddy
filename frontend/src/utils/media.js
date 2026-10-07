const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL

export function getProfilePictureUrl(filename) {
  return `${UPLOADS_URL}/uploads/profiles/${filename}`
}

export function getDestinationImageUrl(filename) {
  return `${UPLOADS_URL}/uploads/destinations/${filename}`
}