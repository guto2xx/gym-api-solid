import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('sould be able to search gyms by title', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym 01',
        description: 'some description',
        phone: null,
        latitude: -23.5889422,
        longitude: -46.6246454,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym 02',
        description: 'some description',
        phone: null,
        latitude: -23.5889422,
        longitude: -46.6246454,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: '01',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym 01',
      }),
    ])
  })
})
