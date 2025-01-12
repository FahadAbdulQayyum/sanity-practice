"use client"

import { client } from '@/sanity/lib/client';
import React, { useState } from 'react';

interface FormData {
    post_title: string;
    post_description: string;
    post_image: File | null;
}

const FormComponent = () => {
    const [formData, setFormData] = useState<FormData>({
        post_title: '',
        post_description: '',
        post_image: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                post_image: e.target.files[0]
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        await sendDataToCMS(formData);
    };

    // const sendDataToCMS = async (formData: FormData) => {
    //     try {
    //         const newPost = {
    //             _type: 'post',
    //             post_title: formData.post_title,
    //             post_description: formData.post_description,
    //             post_image: formData.post_image,
    //         };
    //         const result = await client.create(newPost);
    //         console.log('Post created:', result);
    //     } catch (error) {
    //         console.error('Error creating post:', error);
    //     }
    // }

    const sendDataToCMS = async (formData: FormData) => {
        try {
            let imageAsset = null;

            // Upload the image if it exists
            if (formData.post_image) {
                imageAsset = await client.assets.upload('image', formData.post_image, {
                    filename: formData.post_image.name,
                });
            }

            // Create the post document
            const newPost = {
                _type: 'post',
                post_title: formData.post_title,
                post_description: formData.post_description,
                post_image: imageAsset ? { _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } } : null,
            };

            const result = await client.create(newPost);
            console.log('Post created:', result);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md text-black">
            <div className="mb-4">
                <label htmlFor="post_title" className="block text-gray-700 font-bold mb-2">Post Title</label>
                <input
                    type="text"
                    id="post_title"
                    name="post_title"
                    value={formData.post_title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="post_description" className="block text-gray-700 font-bold mb-2">Post Description</label>
                <input
                    type="text"
                    id="post_description"
                    name="post_description"
                    value={formData.post_description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="post_image" className="block text-gray-700 font-bold mb-2">Post Image</label>
                <input
                    type="file"
                    id="post_image"
                    name="post_image"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Submit
            </button>
        </form>
    );
};

export default FormComponent;
