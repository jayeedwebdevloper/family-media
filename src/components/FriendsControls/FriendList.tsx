'use client'
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../Authentication/AuthenticationParent';
import Link from 'next/link';

type Information = {
    usersData: any,
    findFrnd: any
}

export default function FriendList({ usersData, findFrnd }: Information) {

    const [frndReq, setFrndReq] = useState("");

    const [userInfo, setUserInfo] = useState<any>();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const Logged = onAuthStateChanged(auth, (user) => {
            setUserInfo({ user });
            setLoader(false);
        })
        return () => {
            Logged();
        }
    }, []);

    return (
        loader ? <div>Loading....</div> : userInfo?.user?.uid ? <div>
            {
                findFrnd == "find" ?
                    (usersData && usersData.map((user: any, index: number) => (
                        ((!(user.friends.find((friend: any) => friend.username == userInfo?.user?.uid)) && user?.status != "pending")) &&
                        <div key={index} className='w-full border rounded my-2 px-3 py-2 hover:shadow-md transition-all duration-300'>

                            <div className="flex items-center">
                                <div className="avatar">
                                    <img className='w-16 h-16 object-cover rounded-full' src={user?.img} alt="family" />
                                </div>
                                <div className="profile-info">
                                    <Link className='block px-4 text-lg text-blue-500 font-semibold' href={`/users/${user.username}`}>{user?.displayName}</Link>
                                    <p className='text-sm px-4 text-black/50'>{user?.username}</p>
                                </div>
                                <div className="action flex-1 justify-self-end">
                                    <div className="flex justify-end">
                                        {
                                            frndReq == user.username ? <p className='text-black/50 text-sm'>Requested</p> : <button onClick={() => setFrndReq(user.username)} className='bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-sm text-white px-3 py-2 rounded'>Add Friend</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))) : findFrnd == "request" &&
                    (
                        usersData && usersData.map((user: any, index: number) => (
                            ((!(user.friends.find((friend: any) => friend.username == userInfo?.user?.uid))) && user?.status == "pending") &&
                            <div key={index} className='w-full border rounded my-2 px-3 py-2 hover:shadow-md transition-all duration-300'>

                                <div className="flex items-center">
                                    <div className="avatar">
                                        <img className='w-16 h-16 object-cover rounded-full' src={user?.img} alt="family" />
                                    </div>
                                    <div className="profile-info">
                                        <Link className='block px-4 text-lg text-blue-500 font-semibold' href={`/users/${user.username}`}>{user?.displayName}</Link>
                                        <p className='text-sm px-4 text-black/50'>{user?.username}</p>
                                    </div>
                                    <div className="action flex-1 justify-self-end">
                                        <div className="flex justify-end gap-2">
                                            <button className='bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-xs text-white px-3 py-2 rounded'>Approve</button>
                                            <button className='bg-slate-400 hover:bg-slate-600 transition-all duration-300 text-xs text-white px-3 py-2 rounded'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
            }
        </div> : <div>not logged</div>
    )
}
