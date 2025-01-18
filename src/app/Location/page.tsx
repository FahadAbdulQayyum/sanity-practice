"use client"
import { client } from '@/sanity/lib/client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface locationType {
    name: string
}

const Location = () => {
    const [location, setLocation] = useState<locationType[]>();
    const [filteredLocation, setFilteredLocation] = useState<locationType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchLocation = async () => {
            const fetchLocationData = await client.fetch(`
                *[_type=='location']{ name }
                `)
            // console.log('fetched location data', fetchLocationData)
            setLocation(fetchLocationData);
            setFilteredLocation(fetchLocationData);
        }
        fetchLocation();
    }, [])

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredLocation(location || []);
        } else {
            setFilteredLocation(location?.filter(loc => loc.name.toLowerCase().includes(searchTerm.toLowerCase())) || []);
        }
    }, [searchTerm, location]);

    const handleLocationClick = (name: string) => {
        setSearchTerm(name);
        setLoading(true);
        // setTimeout(() => {
        // setLoading(false);
        router.push(`/services?address=${JSON.stringify(name)}`);
        // }, 5000);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen ">
            <div className="relative flex items-center">
                {loading && <div className="loader absolute left-0 ml-2 border-t-2 border-b-2 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>}
                <input
                    placeholder="Enter your location"
                    className={`flex p-2 ${location ? 'rounded-t-lg' : 'rounded-lg'} cursor-none text-black pl-10`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div
                className="bg-transparent text-black h-32 overflow-y-scroll scrollbar-hide"
            >
                {filteredLocation?.map((v: locationType, i: number) => (
                    <div
                        key={i}
                        // className="flex flex-col px-[33px] bg-white hover:bg-gray-200 cursor-pointer py-2"
                        className="flex flex-col w-[242px] bg-white hover:bg-gray-200 cursor-pointer p-2"
                        onClick={() => handleLocationClick(v.name)}
                    >
                        {v.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Location
