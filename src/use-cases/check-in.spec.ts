import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'javascript gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.5928456),
      longitude: new Decimal(-46.6327671),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shoud be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: '',
      userLatitude: -23.5928456,
      userLongitude: -46.6327671,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('shoud not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: '',
      userLatitude: -23.5928456,
      userLongitude: -46.6327671,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: '',
        userLatitude: -23.5928456,
        userLongitude: -46.6327671,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('shoud be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: '',
      userLatitude: -23.5928456,
      userLongitude: -46.6327671,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: '',
      userLatitude: -23.5928456,
      userLongitude: -46.6327671,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('shoud not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'javascript gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.5889422),
      longitude: new Decimal(-46.6246454),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: '',
        userLatitude: -23.5928456,
        userLongitude: -46.6327671,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
