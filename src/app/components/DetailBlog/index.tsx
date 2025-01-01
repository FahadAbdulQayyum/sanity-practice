import React from 'react'
import { dataType } from '@/app/components/Home';

interface DetailBlogProps {
    data: dataType[] | undefined;
}

const DetailBlog: React.FC<DetailBlogProps> = ({ data }) => {
    return (
        <div>
            {data && data.map((v, i) => <div key={i}>
                <h1>{v.post_title}</h1>
                <p>{v.post_description}</p>
            </div>)}
        </div>
    )
}

export default DetailBlog
