"use client";

import { client } from '@/sanity/lib/client';
import React, { useEffect } from 'react'

const Page = () => {
  useEffect(() => {
    const fetchFunction = async () => {
      const data = await client.fetch(`
        *[_type=='post']{post_name,post_description}
        `)
      console.log('data....', data);
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
