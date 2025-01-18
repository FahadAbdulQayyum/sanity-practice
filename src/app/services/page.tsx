"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';

type dataType = {
    _id: string;
    name: string;
    variation: string;
    city_available: string;
    price: number;
    currently_offered: boolean;
    pic: {
        asset: {
            _ref: string;
        };
    };
};

const FetchingSanityData = () => {
    const [fetchedData, setFetchedData] = useState<dataType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFunction = async () => {
            const data: dataType[] = await client.fetch(`
                *[_type=='service']{
                    _id, 
                    name, 
                    variation, 
                    city_available, 
                    price, 
                    currently_offered, 
                    "pic": pic.asset->url
                }
            `);
            setFetchedData(data);
            setLoading(false);
        };
        fetchFunction();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen relative">
            <div className="loader  border-t-2 border-b-2 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
        </div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {fetchedData.map(service => (
                    <div key={service._id} className="border rounded-lg p-4 shadow-lg">
                        <Image
                            src={urlFor(service?.pic)?.url()}
                            alt={service.name}
                            width="120"
                            height="120"
                            className="w-full h-48 object-cover mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                        <p className="text-gray-700 mb-1">{service.variation}</p>
                        <p className="text-gray-700 mb-1">{service.city_available}</p>
                        <p className="text-gray-900 font-bold mb-1">${service.price}</p>
                        <p className={`text-sm ${service.currently_offered ? 'text-green-500' : 'text-red-500'}`}>
                            {service.currently_offered ? 'Offered' : 'Not Offered'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FetchingSanityData;