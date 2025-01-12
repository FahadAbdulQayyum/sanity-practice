Here’s the updated `README.md` file with your detailed instructions added:

```markdown
# Next.js Project with Sanity Integration

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## How to Install Sanity in the Next.js Project

1. Create a new Next.js project using:

    ```bash
    npx create-next-app@latest <project-name>
    ```

2. Navigate to your project directory:

    ```bash
    cd <project-name>
    ```

3. Install Sanity:

    ```bash
    npm i sanity@latest
    ```

4. Copy the link provided from the Sanity dashboard and paste it into your terminal. After a few minutes, your Sanity project will be initialized.

## Creating a Sanity Schema

1. Create a schema file in `src/sanity/schemaTypes/postType.ts`:

    ```typescript
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
    });

    export default postType;
    ```

2. Add this schema to `src/sanity/schemaTypes/index.ts`:

    ```typescript
    import postType from './postType';

    export const schema = {
        types: [postType],
    };
    ```

## Accessing Sanity Studio

1. Start your development server.
2. Open [http://localhost:3000/studio](http://localhost:3000/studio) in your browser.
3. After logging in with your Gmail account, you can manage your content using the Sanity Studio interface.

## Fetching Data from Sanity

1. Use the Vision tool in Studio ([http://localhost:3000/studio/vision](http://localhost:3000/studio/vision)) to test queries like:

    ```plaintext
    *[_type == "post"]{_id, post_title, post_description, post_image}
    ```

2. Use this query in your Next.js components, e.g., in `Home/index.tsx`:

    ```typescript
    useEffect(() => {
        const fetchFunction = async () => {
            const data: dataType[] = await client.fetch(`
                *[_type == 'post']{_id, post_title, post_description, post_image}
            `);
            setFetchedData(data);
        };
        fetchFunction();
    }, []);
    ```

## Sending Data to Sanity CMS

1. Generate an API token in the Sanity dashboard under **Settings > API**. Set access to `Collaborator` or `Editor`.
2. Add the token to your `.env.local`:

    ```env
    NEXT_PUBLIC_SANITY_API_TOKEN="skDCBXXXXXXXXXXXXXXXXXXXXXXXX"
    ```

3. Import the token in `src/sanity/env.ts`:

    ```typescript
    export const sanityToken = process.env.NEXT_PUBLIC_SANITY_API_TOKEN || '';
    ```

4. Update the client configuration in `src/sanity/lib/client.ts`:

    ```typescript
    import { createClient } from 'next-sanity';
    import { projectId, dataset, sanityToken } from '../env';

    export const client = createClient({
        projectId,
        dataset,
        useCdn: false,
        token: sanityToken,
    });
    ```

5. Create a form to send data, e.g.:

    ```tsx
    "use client";

    import { client } from '@/sanity/lib/client';
    import React, { useState } from 'react';

    const FormComponent = () => {
        const [formData, setFormData] = useState({
            post_title: '',
            post_description: '',
            post_image: null,
        });

        const handleSubmit = async (e) => {
            e.preventDefault();
            const imageAsset = await client.assets.upload('image', formData.post_image);
            const newPost = {
                _type: 'post',
                post_title: formData.post_title,
                post_description: formData.post_description,
                post_image: imageAsset ? { _type: 'image', asset: { _ref: imageAsset._id } } : null,
            };
            await client.create(newPost);
        };

        return (
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
            </form>
        );
    };

    export default FormComponent;
    ```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Sanity Documentation](https://www.sanity.io/docs) - learn about using Sanity.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```

This should include all the details about integrating and working with Sanity in your Next.js project.