import { defineField, defineType } from "sanity";

const postType = defineType({
    title: "Post",
    name: "post",
    type: "document",
    fields: [
        defineField({
            title: "Post Title",
            name: "post_title",
            type: "string",
        })
    ]
})

export default postType;