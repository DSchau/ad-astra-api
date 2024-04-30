import OpenAI from 'openai'

const { 
  OPENAI_KEY
} = process.env

if (!OPENAI_KEY) {
  throw new Error('missing environment variable: OPENAI_KEY')
}

export const DEFAULT_OPTIONS = {
  model: 'gpt-4-turbo'
}

export const ai = new OpenAI({
  apiKey: OPENAI_KEY
})
