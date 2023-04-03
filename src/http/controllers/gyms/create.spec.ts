import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('sould be able to create a gym', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym 01',
        description: 'some description',
        phone: null,
        latitude: -23.5889422,
        longitude: -46.6246454,
      })

    expect(response.statusCode).toEqual(201)
  })
})
