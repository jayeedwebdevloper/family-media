import Link from 'next/link'
import React from 'react'

export default function Family() {
    const myFamily = [
        {
            id: 1,
            userName: "Sarah Loren",
            img: "/assets/friend-avatar2.jpg",
            email: "sarah@gmail.com"
        },
        {
            id: 2,
            userName: "Sarah Loren",
            img: "/assets/friend-avatar2.jpg",
            email: "sarah@gmail.com"
        },
        {
            id: 3,
            userName: "Sarah Loren",
            img: "/assets/friend-avatar2.jpg",
            email: "sarah@gmail.com"
        },
        {
            id: 4,
            userName: "Sarah Loren",
            img: "/assets/friend-avatar2.jpg",
            email: "sarah@gmail.com"
        },
        {
            id: 5,
            userName: "Sarah Loren",
            img: "/assets/friend-avatar2.jpg",
            email: "sarah@gmail.com"
        }
    ]
    return (
        <div className='pt-5'>
            <div className="pb-4">
                <input className='w-full ring-1 rounded px-3 py-1 outline-none border-none focus:ring-[3px]' placeholder='Search Member' type="search" name="member" id="member" />
            </div>
            <ul>
                {
                    myFamily.map((member: any, i: any) => (
                        <li key={i} className='py-4 px-2'>
                            <Link className='flex gap-3 items-center' href={`/my-family/${member.userName}`}>
                                <img className='w-12 rounded-full' src={member.img} alt="family" />
                                <div className="details w-[150px]">
                                    <h6 className='text-sm font-semibold text-sky-600'>{member.userName}</h6>
                                    <p className='text-xs'>{member.email}</p>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
