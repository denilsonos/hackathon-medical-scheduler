import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import { Exception } from '../../../../core/entities/exceptions'
import { findAllByFilterSwagger } from '../../swagger'
import { DbConnectionImpl } from '../../../database/db-connection-impl'
import { DoctorController } from '../../../../adapters/controllers/doctor-controller'
import { IParams } from '../../../../adapters/gateways/interfaces/doctor'

export const findAllByFilterRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/patient/doctors',
    findAllByFilterSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new DoctorController(dbConn)

      await controller
        .findAllByFilter(request.query as IParams)
        .then((doctors) => {
          return reply.status(200).send({ doctors })
        })
        .catch((error) => {
          console.error('*** FIND ALL BY FILTER ROUTE ***', error)
          if (error instanceof Exception) {
            return reply.status(error.statusCode).send(error.body)
          }
        })
    },
  )
}
