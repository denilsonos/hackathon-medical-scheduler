import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Exception } from '../../../../core/entities/exceptions'
import { findAllByFilterSwagger } from '../../swagger'
import { DbConnectionImpl } from '../../../database/db-connection-impl'
import { IFindDoctorsByFilterParams } from '../../../../adapters/gateways/interfaces/patient'
import { PatientController } from '../../../../adapters/controllers/patient-controller'
import { AuthorizationService } from '../../../middlewares/authentication'

export const findDoctorsByFilterRoute = async (fastify: FastifyInstance) => {
  const authorizationService = new AuthorizationService();
  fastify.addHook('preHandler', authorizationService.authenticate);
  
  fastify.get(
    '/patient/doctors',
    findAllByFilterSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new PatientController(dbConn)

      await controller
        .findDoctorsByFilter(request.query as IFindDoctorsByFilterParams)
        .then((doctors) => {
          return reply.status(200).send(doctors)
        })
        .catch((error) => {
          console.error('*** FIND DOCTORS BY FILTER ROUTE ***', error)
          if (error instanceof Exception) {
            return reply.status(error.statusCode).send(error.body)
          }
        })
    },
  )
}
