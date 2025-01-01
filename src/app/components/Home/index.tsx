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
            setFetchedData(data);
        }
        fetchFunction();
    }, []);

    return (
        <div>
            {fetchedData?.length === 0 ? <h1>Loading...</h1> :
                <div className='grid text-[10px] sm:text-[12px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-standardSize'>
                    {
                        fetchedData && fetchedData.map((v: dataType, i) => <div className="flex justify-between items-center bg-gray-50 text-black p-2" key={i}>
                            <span>
                                <h2
                                    className="font-bold uppercase text-sm sm:text-[16px] md:text-[14px]"
                                >{v.post_title}</h2>
                                <span
                                    className="space-y-2"
                                >
                                    <p>{v.post_description}</p>
                                    <Image
                                        src={urlFor(v.post_image).url()}
                                        alt={v.post_title}
                                        width="120"
                                        height="120" />
                                </span>
                            </span>
                        </div>)
                    }
                </div>
            }
        </div >
    )
}

export default Home