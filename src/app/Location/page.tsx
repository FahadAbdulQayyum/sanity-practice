"use client"
import { client } from '@/sanity/lib/client'
import React, { useEffect, useState } from 'react'

interface locationType {
    name: string
}

const Location = () => {

    const [location, setLocation] = useState<locationType[]>();

    useEffect(() => {
        const fetchLocation = async () => {
            const fetchLocationData = await client.fetch(`
                *[_type=='location']{ name }
                `)
            console.log('fetched location data', fetchLocationData)
            setLocation(fetchLocationData);
        }
        fetchLocation();
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-screen ">
            <input placeholder="Enter your location" className='flex p-2 rounded-t-lg cursor-none text-black' />
            <div
                className="bg-white text-black h-32 overflow-y-scroll scrollbar-hide"
            >
                {location?.map((v: locationType, i: number) => <div key={i} className="flex flex-col px-[18px] hover:bg-gray-200 cursor-pointer my-2">{v.name}</div>)}
            </div>
        </div>
    )
}

export default Location
