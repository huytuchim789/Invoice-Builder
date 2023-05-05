export function buildUrl(baseUrl: string, params: Record<string, any>, encode = true) {
  const query = new URLSearchParams()
  Object.entries(params)
    .filter(e => ![undefined, null].includes(e[1]))
    .map(([key, val]) => {
      const value = typeof val === 'object' ? JSON.stringify(val) : val
      query.set(key, encode ? encodeURI(value) : value)
    })

  return `${baseUrl}?${query}`
}
