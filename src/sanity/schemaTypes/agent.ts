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
            type: 'Array',
            title: 'Available Time'
        },
        {
            name: 'service_provides',
            type: 'Array',
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
