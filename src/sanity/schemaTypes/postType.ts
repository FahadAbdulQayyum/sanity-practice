import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { defineField, defineType } from "sanity";

const postType = defineType({
    title: "Post",
    name: "post",
    type: "document",
    fields: [
        defineField({
            title: "Post Title",
            name: "post_title",
            type: "string"
        }),
        defineField({
            title: "Post Description",
            name: "post_description",
            type: "string"
        }),
        defineField({
            title: "Post Image",
            name: "post_image",
            type: "image"
        }),
    ]
})

export default postType;