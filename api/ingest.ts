import { DecoratorBase, Elysia } from 'elysia'

import { cache, INGEST_CACHE_KEY } from '../lib/cache'

const router = (app: Elysia<string, DecoratorBase>) => {
  return app
    .onError(({ code, error, set }) => {
      set.status = 500

      return {
        type: code,
        message: error.toString()
      }
    })
    .post('/ingest', async ({ body }) => {
      const { key, value } = body as any

      try {
        const normalized_key = [INGEST_CACHE_KEY, key].join('_')
        const normalized_value = typeof value === 'string' ? {
          key,
          message: value
        } : Object.assign({}, value, {
          key
        })
  
        await cache.set(normalized_key, normalized_value)
  
        return {
          message: `Successfully ingested data with key: ${normalized_key}`
        }
      } catch (e) {
        return {
          status: 500,
          e: e.message,
          stack: e.stack
        }
      }
    })
}

export { router }
