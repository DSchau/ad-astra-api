let memoryCache = new Map()

export const INGEST_CACHE_KEY = 'v1_ingest'

export const cache = memoryCache


export const getAll = () => {
  const entries = cache.entries()

  let all: any[] = []

  for (let [_, value] of entries) {
    all.push(value as any)
  }

  return all
}

export const clear = () => {
  memoryCache.clear()
}
