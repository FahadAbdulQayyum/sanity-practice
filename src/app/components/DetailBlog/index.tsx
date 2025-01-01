import React from 'react'
import { urlFor } from '@/sanity/lib/image';
import { dataType } from '@/app/components/Home';
import Image from 'next/image';

interface DetailBlogProps {
    data: dataType[] | undefined;
}

const DetailBlog: React.FC<DetailBlogProps> = ({ data }) => {
    return (
        <div>
            {data && data.map((v, i) => <div key={i}>
                <h1 className="font-bold">{v.post_title}</h1>
                <span className="flex flex-col md:flex-row ">
                    <p>{v.post_description}</p>
                    <Image
                        src={urlFor(v.post_image).url()}
                        alt={v.post_title}
                        width="200"
                        height="200" />
                </span>
            </div>)
            }
        </div >
    )
}

export default DetailBlog
