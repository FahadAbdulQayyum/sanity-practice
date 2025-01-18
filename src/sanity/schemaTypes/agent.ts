export default {
    name: 'agent',
    type: 'document',
    title: 'Agent',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Agent Name',
        },
        {
            name: 'available_time',
            type: 'array',
            title: 'Available Time',
            of: [{ type: 'string' }]
        },
        {
            name: 'service_provides',
            type: 'array',
            title: 'Service Provides',
            of: [{ type: 'string' }]
        },
        {
            name: 'portfolio',
            type: 'image',
            title: 'Agent Image',
            options: {
                hotspot: true // Enables cropping and focal point selection
            }
        }
    ]
};
