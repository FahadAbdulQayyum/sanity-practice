"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

const Detail = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Access the 'id' query parameter

    console.log('Query Parameter ID:', id);

    return (
        <div>
            <h1>Detail Page for ID: {id}</h1>
        </div>
    );
};

export default Detail;
