import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('shoud be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Dee',
      email: 'johndee@example.com',
      password: '12345',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('shoud hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Dee',
      email: 'johndee@example.com',
      password: '12345',
    })

    const isPasswordCorrectlyHashed = await compare('12345', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('shoud shoud not be able to register with same email twice', async () => {
    const email = 'johndee@example.com'

    await sut.execute({
      name: 'John Dee',
      email,
      password: '12345',
    })

    await expect(() =>
      sut.execute({
        name: 'John Dee',
        email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
