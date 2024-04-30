import { DecoratorBase, Elysia } from 'elysia'

import { ai } from '../lib/openai'
import { cache, getAll } from '../lib/cache'

const omit = (jsonValue, key) => {
  const clone = Object.assign({}, jsonValue)
  delete clone[key]

  return clone
}

const router = (app: Elysia<string, DecoratorBase>) => {
  return app
    .get('/response', () => {
      return {
        message: 'Hello World'
      };
    
    })
    .get('/response/:id', ({ params }) => {
      return {
        message: `Hello ${params.id}`
      };
    })
    .get('/prompt', async ({ query: queryParams, headers }) => {
      try {
        const { query } = queryParams

        const token = headers['Postman-Token']
        if (!token) {
          throw new Error('Only works with Postman!')
        }

        const all = getAll()
          .map(value => {
            const normalized = omit(value, 'key')
            return {
              role: 'system',
              content: `This is ${value.key} data: ${JSON.stringify(normalized)}`
            }
          })

        const data = await ai.chat.completions.create({
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a conversational AI bot. You will be fed data as inputs, and you will do your best to help the user with their inquries. You are pleasant, fun, and have a bit of personality but you do your best to help answer the questions that you get. It is better to say "I do not know" than to give a false answer if you are not highly confident.'
            }
          ].concat(
            all as any[]
          ).concat([
            {
              role: 'user',
              content: query as string
            }
          ]) as any[]
        })
      
        return {
          response: data.choices.map(choice => {
            return choice.message.content
          }).join('\n')
        }
      } catch (e) {
        return {
          status: 500,
          message: e.message,
          stack: e.stack
        }
      }
      
    })
}

export { router }
