"use client";

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface dataType {
    post_title: string,
    post_description: string,
    // post_image: string
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
        *[_type=='post']{post_title,post_description,post_image}
        `)
            console.log('data....', data);
            setFetchedData(data);
        }
        fetchFunction();
    }, []);

    return (
        <div>
            {fetchedData?.length === 0 ? <h1>Loading...</h1> :
                <div>
                    {
                        fetchedData && fetchedData.map((v: dataType, i) => <div className="flex justify-between items-center bg-gray-50 text-black p-2 my-2" key={i}>
                            <span>
                                <h2
                                    className="font-bold uppercase text-xl"
                                >{v.post_title}</h2>
                                <p
                                    className="mx-5"
                                >{v.post_description}</p>
                            </span>
                            <Image
                                src={urlFor(v.post_image).url()}
                                alt={v.post_title}
                                width="120"
                                height="120" />
                        </div>)
                    }
                </div>
            }
        </div >
    )
}

export default Home