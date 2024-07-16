'use client'
import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

type PropsType = {
    memoryPage: any
}

export default function FamilyMemories(props: PropsType) {

    const { memoryPage } = props;
    const [index, setIndex] = useState(-1);

    const slides = memoryPage?.files.map((data: any, i: number) => ({
        src: data.img,
    })) || [];

    const handleImageClick = (index: number) => {
        setIndex(index); // Update with 'currentIndex'
    };

    return (
        <div className='bg-white p-2 rounded-md shadow flex flex-wrap justify-center'>
            {memoryPage?.files.map((data: any, i: number) => (
                <img
                    onClick={() => handleImageClick(i)} // Use handleImageClick function
                    className='w-[220px]'
                    key={i}
                    src={data.img}
                    alt="family"
                />
            ))}
            <Lightbox
                index={index} // Use 'currentIndex'
                slides={slides}
                open={index >= 0} // Use 'isOpen' for clarity
                close={() => setIndex(-1)} // Update with 'currentIndex'
            />
        </div>
    )
}
