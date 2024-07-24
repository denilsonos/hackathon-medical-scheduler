export const findAllByFilterSwagger = () => ({
  schema: {
    tags: ['Doctor'],
    query: {
      name: { type: 'string' },
      crm: { type: 'string' },
      rating: { type: 'number' },
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            crm: { type: 'string' },
            specialty: { type: 'string' },
            rating: { type: 'number' },
            availability: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  day: { type: 'string' },
                  times: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
      400: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          issues: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                fatal: { type: 'boolean' },
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
})

export const makeAnAppointmentSwagger = () => ({
  schema: {
    tags: ['Appointment'],
    body: {
      type: 'object',
      properties: {
        doctorId: { type: 'number' },
        patientEmail: { type: 'string' },
        date: { type: 'string' },
        time: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          date: { type: 'string' },
          time: { type: 'string' },
          status: { type: 'string' },
        },
      },
      400: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          issues: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                fatal: { type: 'boolean' },
                message: { type: 'string' },
              },
            },
          },
        },
      },
      409: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
})

export const cancelAnAppointmentSwagger = () => ({
  schema: {
    tags: ['Appointment'],
    params: {
      id: { type: 'string' },
    },
    body: {
      type: 'object',
      properties: {
        reason: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      400: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          issues: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                fatal: { type: 'boolean' },
                message: { type: 'string' },
              },
            },
          },
        },
      },
      409: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
})

export const confirmOrDeclineAnAppointmentSwagger = () => ({
  schema: {
    tags: ['Appointment'],
    params: {
      id: { type: 'string' },
    },
    body: {
      type: 'object',
      properties: {
        reason: { type: 'string' },
        status: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      400: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          issues: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                fatal: { type: 'boolean' },
                message: { type: 'string' },
              },
            },
          },
        },
      },
      409: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
})

export const updateAvailabilitySwagger = () => ({
  schema: {
    tags: ['Availability'],
    body: {
      type: 'object',
      properties: {
        doctorId:  { type: 'number' },
        availability: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              day: { type: 'string' },
              times: { 
                type: 'array',
                items: {
                  type: 'string',
                },
               },
            },
          },
        },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      400: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          issues: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                fatal: { type: 'boolean' },
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
})
