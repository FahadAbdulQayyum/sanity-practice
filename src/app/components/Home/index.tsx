"use client";

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Change this import
import React, { useEffect, useState } from 'react'


export interface dataType {
    _id: string,
    post_title: string,
    post_description: string,
    post_image: {
        asset: {
            _ref: string
        }
    }
}

const Home = () => {

    const [fetchedData, setFetchedData] = useState<dataType[]>();
    useEffect(() => {
        const fetchFunction = async () => {
            const data: dataType[] = await client.fetch(`
        *[_type=='post']{_id, post_title, post_description, post_image}
        `)
            setFetchedData(data);
        }
        fetchFunction();
    }, []);

    const router = useRouter();

    const handleNavigate = (id: string) => {
        router.push(`/detail/${id}`); // Navigate to the dynamic route
    };

    const deleteCard = async (postId: string) => {
        try {
            await client.delete(postId);
            console.log(`Post ${postId} deleted successfully!`);
        } catch (error) {
            // console.error('Error deleting post:', error?.message);
            console.error('Error deleting post:', error);
        }
    }

    // const updatePost = async (postId: string, updatedData) => {
    //     try {
    //         await client.patch(postId) // Target the post by ID
    //             .set(updatedData)        // Set new data
    //             .commit();               // Commit changes

    //         console.log(`Post ${postId} updated successfully!`);
    //     } catch (error) {
    //         console.error('Error updating post:', error.message);
    //     }
    // };

    // const updateForm = (data: any) => {
    //     console.log('data...', data);
    //     // const queryString = new URLSearchParams({ data: JSON.stringify(data) }).toString();
    //     // router.push(`/form?${queryString}`);

    //     router.push({
    //         pathname: '/form',
    //         query: { data }
    //     });

    //     console.log('.....')
    // }

    const updateForm = (data: dataType) => {
        console.log('data...', JSON.stringify(data));
        console.log('====================================');
        router.push(`/form?id=${JSON.stringify(data)}`);
    }

    return (
        <div>
            {fetchedData?.length === 0 ? <h1>Loading...</h1> :
                <div className='grid text-[10px] sm:text-[12px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-standardSize'>
                    {
                        fetchedData && fetchedData.map((v: dataType, i) => <div key={i} className="relative">
                            <button className="bg-red-700 absolute top-2 right-14 text-white p-1 rounded cursor-pointer" onClick={() => deleteCard(v._id)}>Delete</button>
                            <button className="bg-green-700 absolute top-2 right-2 text-white p-1 rounded cursor-pointer"
                                onClick={() => { updateForm(v) }}
                            >Update</button>
                            <div className="flex justify-between items-center bg-gray-50 text-black p-5" onClick={() => handleNavigate(v._id)}>
                                <span>
                                    <h2
                                        className="font-bold uppercase text-sm sm:text-[16px] md:text-[14px]"
                                    >{v.post_title}</h2>
                                    <span
                                        className="space-y-2"
                                    >
                                        <p>{v.post_description}</p>
                                        <Image
                                            src={urlFor(v?.post_image)?.url()}
                                            alt={v.post_title}
                                            width="120"
                                            height="120" />
                                    </span>
                                </span>
                            </div>
                        </div>)
                    }
                </div>
            }
        </div >
    )
}

export default Home