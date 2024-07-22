import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Exception } from '../../../../core/entities/exceptions'
import { cancelAnAppointmentSwagger } from '../../swagger'
import { DbConnectionImpl } from '../../../database/db-connection-impl'
import { PatientController } from '../../../../adapters/controllers/patient-controller'

export const cancelAnAppointmentRoute = async (fastify: FastifyInstance) => {
  fastify.patch(
    '/patient/appointments/:id',
    cancelAnAppointmentSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new PatientController(dbConn)

      const { id } = request.params as { id: number }
      const { reason } = request.body as { reason: string }

      await controller
        .cancelAnAppointment({
          id: Number(id),
          reason,
        })
        .then((appointment) => {
          return reply.status(200).send(appointment)
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
