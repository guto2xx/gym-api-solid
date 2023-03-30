import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsCaseRequest {
  query: string
  page: number
}

interface SearchGymsCaseResponse {
  gyms: Gym[]
}

export class SearchGymsCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsCaseRequest): Promise<SearchGymsCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
