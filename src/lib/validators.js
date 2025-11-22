export function isValidUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (e) {
    return false
  }
}

export function isValidCode(value) {
  return /^[A-Za-z0-9]{6,8}$/.test(value)
}
