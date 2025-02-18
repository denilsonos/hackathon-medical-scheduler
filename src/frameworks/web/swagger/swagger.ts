export const swaggerUiOptions = {
    routePrefix: '/docs',
    exposeRoute: true,
}

export const swaggerOptions = {
    swagger: {
        info: {
            title: 'Tech Challenge - Orders Project',
            description: 'Project developed to serve a restaurant ordering system.',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        tags: [
            { name: 'Doctor', description: 'Doctor\'s endpoints' },
            { name: 'Appointment', description: 'Appointment\'s endpoints' },
            { name: 'Availability', description: 'Availability\'s endpoints' }
        ]
    }
}