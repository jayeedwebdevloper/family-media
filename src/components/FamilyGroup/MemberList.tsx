import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function MemberList() {
    const [actionMember, setActionMember] = useState("h-0 -z-[1] invisible scale-0");
    const usersData = [
        {
            id: 1,
            role: "grandmother",
            displayName: "Miky",
            displayRole: "Grand Mother",
            img: "/assets/grandmother.jpg"
        }
    ]
    return (
        <div className='pt-1'>
            {
                usersData.map((user: any, i: number) => (
                    <div key={i} className='shadow px-2 py-2 border'>
                        <div className="flex justify-between w-full items-center">
                            <Link className='flex items-center' href={`/user/role/${user.role}`}>
                                <img src={user.img} alt="family" className='w-14 h-14 rounded-full object-cover' />
                                <div className="details px-2">
                                    <h2 className='text-blue-500 font-semibold'>{user.displayName}</h2>
                                    <p className='text-black/50 text-xs'>{user.displayRole}</p>
                                </div>

                            </Link>
                            <div className="action relative">
                                <button onClick={() => setActionMember(actionMember == "h-0 -z-[1] invisible scale-0" ? "h-auto z-[50] visible scale-100" : "h-0 -z-[1] invisible scale-0")} className='hover:bg-slate-200 p-2 rounded-full'>
                                    <Image width={1000} height={1000} src="/icons/threedot-v.svg" alt='family' className='w-5 h-5' />
                                </button>
                                <ul className={`control transition-all duration-300 border shadow rounded w-[160px] absolute bg-white right-0 ${actionMember}`}>
                                    <li className='px-3 py-1 hover:bg-slate-200 transition-all duration-300'>
                                        <Link className='flex gap-3 items-center justify-start text-sm py-2' href={`/user/${user.username}`}>
                                            <Image className='w-4' width={1000} height={1000} src="/icons/profile.svg" alt='family' />
                                            View Profile
                                        </Link>
                                    </li>
                                    <li className='px-3 py-1 hover:bg-slate-200 transition-all duration-300'>
                                        <button className='bg-transparent outline-none border-none text-sm flex items-center gap-3 py-2'>
                                            <Image className='w-4' width={1000} height={1000} src="/icons/edit.svg" alt='family' />
                                            Edit Member
                                        </button>
                                    </li>
                                    <li className='px-3 py-1 hover:bg-slate-200 transition-all duration-300'>
                                        <button className='bg-transparent outline-none border-none text-sm flex items-center gap-3 py-2'>
                                            <Image className='w-4' width={1000} height={1000} src="/icons/delete.svg" alt='family' />
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
