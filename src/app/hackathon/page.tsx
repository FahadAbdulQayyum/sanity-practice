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
        };
        fetchFunction();
    }, []);

    return (
        <div>
            {fetchedData.map(service => (
                <div key={service._id}>
                    <h2>{service.name}</h2>
                    <p>{service.variation}</p>
                    <p>{service.city_available}</p>
                    <p>{service.price}</p>
                    <p>{service.currently_offered ? 'Offered' : 'Not Offered'}</p>
                    {/* <Image src={service.pic} alt={service.name} /> */}
                    <Image
                        src={urlFor(service?.pic)?.url()}
                        alt={service.name}
                        width="120"
                        height="120"
                    />
                </div>
            ))}
        </div>
    );
};

export default FetchingSanityData;