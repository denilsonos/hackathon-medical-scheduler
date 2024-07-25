import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Exception } from '../../../../core/entities/exceptions'
import { confirmOrDeclineAnAppointmentSwagger } from '../../swagger'
import { DbConnectionImpl } from '../../../database/db-connection-impl'
import { DoctorController } from '../../../../adapters/controllers/doctor-controller'
import { AuthorizationService } from '../../../middlewares/authentication'

export const confirmOrDeclineAnAppointmentRoute = async (
  fastify: FastifyInstance,
) => {
  const authorizationService = new AuthorizationService();
  fastify.addHook('preHandler', authorizationService.authenticate);

  fastify.patch(
    '/doctor/appointments/:id',
    confirmOrDeclineAnAppointmentSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new DoctorController(dbConn)

      const { id } = request.params as { id: number }
      const { reason, status } = request.body as {
        reason: string
        status: 'confirmed' | 'declined'
      }

      await controller
        .confirmOrDeclineAnAppointment({
          id: Number(id),
          reason,
          status,
        })
        .then(() => {
          return reply.status(200).send({ message: `Appointment ${status}` })
        })
        .catch((error) => {
          console.error('*** MAKE AN APPOINTMENT ROUTE ***', error)
          if (error instanceof Exception) {
            return reply.status(error.statusCode).send(error.body)
          }
        })
    },
  )
}
