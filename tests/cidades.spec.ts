import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('Integração da API Viação Paranaense', async () => {
  await setup()

  it('deve responder 200 OK no endpoint de cidades', async () => {
    const response = await $fetch('/api/get_cidades')
    expect(response).toBeDefined()
    expect(Array.isArray(response)).toBe(true)
  })
})