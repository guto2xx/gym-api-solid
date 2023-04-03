import { makeValitadeCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamSchema.parse(request.query)

  const createCheckInUseCase = makeValitadeCheckInUseCase()

  await createCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
