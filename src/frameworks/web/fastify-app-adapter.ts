import 'dotenv/config'
import fastify, { FastifyInstance } from 'fastify'
import multipart from '@fastify/multipart'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { AppAdapter } from '../../adapters/gateways/app-adapter'
import { swaggerOptions, swaggerUiOptions } from './swagger/swagger'
import { findDoctorsByFilterRoute } from './routes/patient/find-doctors-by-filter-route'
import { makeAnAppointmentRoute } from './routes/patient/make-an-appointment-route'
import { cancelAnAppointmentRoute } from './routes/patient/cancel-an-appointment-route'
import { confirmOrDeclineAnAppointmentRoute } from './routes/doctor/confirm-or-decline-an-appointment-route'
import { updateAvailabilityRoute } from './routes/doctor/update-availability-route'

export class FastifyAppAdapter implements AppAdapter {
  private readonly app: FastifyInstance
  private readonly port = Number(process.env.APP_PORT)
  private readonly host = process.env.APP_HOST

  constructor() {
    this.app = fastify({
      logger: true,
      requestTimeout: 30000,
    })
  }

  public async init(): Promise<void> {
    this.app.register(multipart)
    this.app.register(cors, {
      origin: [`http://localhost:3333`],
    })

    this.app.register(fastifySwagger, swaggerOptions)
    this.app.register(fastifySwaggerUi, swaggerUiOptions)

    // Doctor Routes
    this.app.register(confirmOrDeclineAnAppointmentRoute, { prefix: '/api/v1' }) // http://localhost:3000/api/v1/doctor/appointments/:id
    this.app.register(updateAvailabilityRoute, { prefix: '/api/v1' }) // http://localhost:3000/api/v1/doctor/availability

    // Patients Routes
    this.app.register(findDoctorsByFilterRoute, { prefix: '/api/v1' }) // http://localhost:3000/api/v1/patient/doctors
    this.app.register(makeAnAppointmentRoute, { prefix: '/api/v1' }) // http://localhost:3000/api/v1/patient/appointments
    this.app.register(cancelAnAppointmentRoute, { prefix: '/api/v1' }) // http://localhost:3000/api/v1/patient/appointments/:id

    await this.app
      .listen({ host: this.host, port: this.port })
      .then(() => {
        console.log(`🚀 HTTP server running on http://localhost:${this.port}`)
      })
      .catch((error) => {
        console.error('Error starting the server:', error)
        throw error
      })
  }
}
