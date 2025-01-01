'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { dataType } from '@/app/components/Home';
import DetailBlog from '@/app/components/DetailBlog';

const Detail = () => {
    const { id } = useParams();

    const [fetchedData, setFetchedData] = useState<dataType[]>();

    useEffect(() => {
        const fetchFunction = async () => {
            const data: dataType[] = await client.fetch(`
        *[_type=='post']{_id,post_title,post_description,post_image}
        `)
            const filteredData: dataType[] = data.filter(v => v._id === id)
            setFetchedData(filteredData);
        }
        fetchFunction();
    }, [])

    return (
        <div>
            <DetailBlog data={fetchedData}/>
        </div>
    );
};

export default Detail;
