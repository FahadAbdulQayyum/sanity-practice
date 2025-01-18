"use client"
import { client } from '@/sanity/lib/client'
import React, { useEffect, useState } from 'react'

interface locationType {
    name: string
}

const Location = () => {

    const [location, setLocation] = useState<locationType[]>();
    const [filteredLocation, setFilteredLocation] = useState<locationType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLocation = async () => {
            const fetchLocationData = await client.fetch(`
                *[_type=='location']{ name }
                `)
            console.log('fetched location data', fetchLocationData)
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

    return (
        <div className="flex flex-col justify-center items-center h-screen ">
            <input
                placeholder="Enter your location"
                className='flex p-2 rounded-t-lg cursor-none text-black'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div
                className="bg-white text-black h-32 overflow-y-scroll scrollbar-hide"
            >
                {filteredLocation?.map((v: locationType, i: number) => <div key={i} className="flex flex-col px-[18px] hover:bg-gray-200 cursor-pointer my-2">{v.name}</div>)}
            </div>
        </div>
    )
}

export default Location
