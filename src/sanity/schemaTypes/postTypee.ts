export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
      {
        name: 'post_title',
        title: 'Post Title',
        type: 'string',
      },
      {
        name: 'post_description',
        title: 'Post Description',
        type: 'text',
      },
      {
        name: 'post_image',
        title: 'Post Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
    ],
  };
  