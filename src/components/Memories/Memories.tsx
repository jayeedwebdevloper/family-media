import React from 'react';

type PropsType = {
    selectedMemories: string,
    setSelectMemories: any,
    setMemoryPage: any
}

export default function Memories(props: PropsType) {

    const { selectedMemories, setSelectMemories, setMemoryPage } = props;

    const memoriesData = [
        {
            id: 1,
            category: "asia_trip",
            title: "family trip in asia",
            files: [
                {
                    id: 1,
                    img: "/assets/anika.jpg"
                },
                {
                    id: 2,
                    img: "/assets/anika.jpg"
                },
                {
                    id: 3,
                    img: "/assets/anika.jpg"
                },
                {
                    id: 4,
                    img: "/assets/anika.jpg"
                },
                {
                    id: 5,
                    img: "/assets/anika.jpg"
                },
                {
                    id: 6,
                    img: "/assets/anika.jpg"
                },
                {
                    id: 7,
                    img: "/assets/anika.jpg"
                }
            ]
        },
        {
            id: 2,
            category: "grand_mother_birthday",
            title: "Grandmother Birthday",
            files: [
                {
                    id: 1,
                    img: "/assets/grandmother.jpg"
                },
                {
                    id: 2,
                    img: "/assets/grandmother.jpg"
                },
                {
                    id: 3,
                    img: "/assets/grandmother.jpg"
                },
                {
                    id: 4,
                    img: "/assets/grandmother.jpg"
                },
                {
                    id: 5,
                    img: "/assets/grandmother.jpg"
                },
                {
                    id: 6,
                    img: "/assets/grandmother.jpg"
                },
                {
                    id: 7,
                    img: "/assets/grandmother.jpg"
                }
            ]
        }
    ]

    return (
        <div className='pt-1'>
            {
                selectedMemories != "" &&
                <button onClick={() => setSelectMemories("")} className={`capitalize px-2 py-2 bg-blue-400 w-full my-1 text-white font-semibold rounded hover:bg-blue-700 transition-all duration-300`} >Back to the feeds</button>
            }
            {
                memoriesData.map((memory: any, i: number) => (
                    <button onClick={() => { setSelectMemories(memory.category); setMemoryPage(memory) }} className={`capitalize px-2 py-2 bg-blue-400 w-full my-1 text-white font-semibold rounded hover:bg-blue-700 transition-all duration-300`} key={i}>{memory.title}</button>
                ))
            }
        </div>
    )
}
