import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Exception } from '../../../../core/entities/exceptions'
import { makeAnAppointmentSwagger } from '../../swagger'
import { DbConnectionImpl } from '../../../database/db-connection-impl'
import { IMakeAnAppointmentParams } from '../../../../adapters/gateways/interfaces/patient'
import { PatientController } from '../../../../adapters/controllers/patient-controller'
import { AuthorizationService } from '../../../middlewares/authentication'

export const makeAnAppointmentRoute = async (fastify: FastifyInstance) => {
  const authorizationService = new AuthorizationService();
  fastify.addHook('preHandler', authorizationService.authenticate);
  
  fastify.post(
    '/patient/appointments',
    makeAnAppointmentSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new PatientController(dbConn)

      await controller
        .makeAnAppointment(request.body as IMakeAnAppointmentParams)
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
