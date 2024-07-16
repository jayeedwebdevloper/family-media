import Link from 'next/link';
import React from 'react';

type PropsType = {
    profileRoute: string,
    profileCover: any
}

export default function MyFamily(props: PropsType) {
    const { profileRoute, profileCover } = props;
    return (
        <div>
            {
                profileCover && profileCover.map((user: any, index: number) => (
                    user?.friends.map((fr: any, i: number) => (
                        // ((!(user.friends.find((friend: any) => friend.username == userInfo?.user?.uid))) && user?.status == "pending") &&
                        fr?.status == "family" &&
                        <div key={index} className='w-full border rounded my-2 px-3 py-2 hover:shadow-md transition-all duration-300'>

                            <div className="flex items-center">
                                <div className="avatar">
                                    <img className='w-14 h-14 object-cover rounded-full' src={fr?.avatar} alt="family" />
                                </div>
                                <div className="profile-info">
                                    <Link className='block px-4 text-lg text-blue-500 font-semibold' href={`/users/${fr.username}`}>{user?.displayName}</Link>
                                    <p className='text-sm px-4 text-black/50'>{fr?.username}</p>
                                </div>
                                <div className="action flex-1 justify-self-end">
                                    <div className="flex justify-end gap-2">
                                        <button className='bg-slate-400 hover:bg-slate-600 transition-all duration-300 text-xs text-white px-3 py-2 rounded'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ))
            }
        </div>
    )
}
