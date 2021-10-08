export function capitalize(string) {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export function storage(key, data) {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data))
  } else {
    return JSON.parse(localStorage.getItem(key))
  }
}
export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}
