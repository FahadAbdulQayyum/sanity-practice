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
            type: 'string',
            title: 'Available Time'
        },
        {
            name: 'service_provides',
            type: 'string',
            title: 'Service Provides'
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
