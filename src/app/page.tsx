"use client";

import { client } from '@/sanity/lib/client';
import React, { useEffect } from 'react'

const Page = () => {
  useEffect(() => {
    const fetchFunction = async () => {
      const data = await client.fetch(`
        *[_type=='post']{post_name,post_description}
        `)
      const datajson = await data.json();
      console.log('datajson..', datajson);
    }
    fetchFunction();
  }, []);

  return (
    <div>
      Hello Word! Just check the console for now about fetching result.
    </div>
  )
}

export default Page
