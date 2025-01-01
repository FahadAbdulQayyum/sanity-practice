"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

const Detail = () => {
    const router = useRouter();
    // const { id } = router.query;
    const { query } = router;

    const id = query.id;
    console.log('router...', router)

    return (
        <div>
            {/* <h1>Detail Page for ID: {id}</h1> */}
        </div>
    )
}

export default Detail
