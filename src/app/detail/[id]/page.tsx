'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const Detail = () => {
    const { id } = useParams();

    console.log('Dynamic Route ID:', id);

    return (
        <div>
            <h1>Detail Page for ID: {id}</h1>
        </div>
    );
};

export default Detail;
