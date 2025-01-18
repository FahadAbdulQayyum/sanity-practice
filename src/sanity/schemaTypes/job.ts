export default {
    name: 'job',
    type: 'document',
    title: 'Job',
    fields: [
        {
            name: 'id',
            type: 'string',
            title: 'ID',
        },
        {
            name: 'name',
            type: 'string',
            title: 'Job Name',
        },
        {
            name: 'city_available',
            type: 'string',
            title: 'City Available',
        },
        {
            name: 'pic_url',
            type: 'url',
            title: 'Picture URL',
        },
        {
            name: 'price',
            type: 'number',
            title: 'Price',
        },
        {
            name: 'agent_choosen',
            type: 'boolean',
            title: 'Agent Chosen',
        }
    ]
};
