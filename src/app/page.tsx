"use client";

import { client } from '@/sanity/lib/client';
import React, { useEffect, useState } from 'react'

interface dataType {
  post_title: string,
  post_description: string
}

const Page = () => {
  const [fetchedData, setFetchedData] = useState<dataType[]>();
  useEffect(() => {
    const fetchFunction = async () => {
      const data: dataType[] = await client.fetch(`
        *[_type=='post']{post_title,post_description}
        `)
      console.log('data....', data);
      setFetchedData(data);
    }
    fetchFunction();
  }, []);

  return (
    <div>
      {fetchedData?.length === 0 ? <h1>Loading...</h1> :
        <div
        // className="p-2"
        >
          {
            fetchedData && fetchedData.map((v: dataType, i) => <div className="bg-gray-50 text-black p-2 my-2" key={i}>
              <h2
                className="font-bold uppercase text-xl"
              >{v.post_title}</h2>
              <p
                className="mx-5"
              >{v.post_description}</p>
            </div>)
          }
        </div>
      }
    </div >
  )
}

export default Page
