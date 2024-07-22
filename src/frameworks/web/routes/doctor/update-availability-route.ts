import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Exception } from '../../../../core/entities/exceptions'
import { DbConnectionImpl } from '../../../database/db-connection-impl'
import { AuthorizationService } from '../../../middlewares/authentication'
import { DoctorController } from '../../../../adapters/controllers/doctor-controller'
import { updateAvailabilitySwagger } from '../../swagger'

export const updateAvailabilityRoute = async (fastify: FastifyInstance) => {
  const authorizationService = new AuthorizationService();
  fastify.addHook('preHandler', authorizationService.authenticate);

  fastify.put(
    '/doctor/availability',
    updateAvailabilitySwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new DoctorController(dbConn);

      await controller.updateAvailability(request.body)
        .then(() => {
          return reply.status(200).send({
            message: 'Availability updated successfully!',
          })
        })
        .catch((error) => {
          if (error instanceof Exception) {
            return reply.status(error.statusCode).send(error.body)
          }
        })
    },
  )
}
