import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type PropsType = {
    triggerRefetch: any;
    usersData: any;
    loader: any;
    userInfo: any;
    setLoader: any;
}

export default function MemberList({ usersData, triggerRefetch, loader, userInfo, setLoader }: PropsType) {
    const [actionMember, setActionMember] = useState<any>(null);
    const toggleAction = (userName: any) => {
        setActionMember(actionMember === userName ? null : userName);
    };

    const currentUserData = usersData?.find((user: any) => user?.uid == userInfo?.user?.uid);
    useEffect(() => {
        if (currentUserData) {
            setLoader(false);
        } else {
            setLoader(true);
        }
    }, [currentUserData]);

    // console.log(currentUserData);


    // const usersData = [
    //     {
    //         id: 1,
    //         role: "grandmother",
    //         displayName: "Miky",
    //         displayRole: "Grand Mother",
    //         img: "/assets/grandmother.jpg"
    //     }
    // ]

    const handleDeleteMember = (data: any) => {

        // const friendData = usersData?.find((user: any) => user.userName == member)
        const currentUserCheck = usersData?.find((user: any) => user?.uid == userInfo?.user?.uid);
        // const friend = currentUserCheck.friends.find((friend: any) => friend.uid == friendData.uid)

        const user = currentUserCheck._id;
        const addFamily = {
            userId: user,
            friend: {
                // ...friend,
                status: "family",
                displayRole: "",
                role: ""
            }
        }

        console.log(data, user)

        // const secondUser = usersData.find((user: any) => user.uid == friend.uid);
        // const user2 = secondUser._id;
        // const friend2 = secondUser.friends.find((friend: any) => friend.uid == currentUserCheck.uid)

        const addFamily2 = {
            // userId: user2,
            friend: {
                // ...friend2,
                status: "family",
                displayRole: "",
                role: ""
            }
        }

        // console.log(addFamily, addFamily2);

        // fetch(`/family-api/users/${user}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(addFamily)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         fetch(`/family-api/users/${user2}`, {
        //             method: "PUT",
        //             headers: {
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify(addFamily2)
        //         })
        //             .then(res => res.json())
        //             .then(data => {

        //                 triggerRefetch();
        //             })
        //     })
    }
    return (
        <div className='pt-1'>
            {
                loader ? <div className='text-lg py-5 px-3'>Loading...</div> : usersData.length == 0 ? <div className='text-lg py-5 px-3'>Loading...</div> : usersData.map((user: any, i: number) => (
                    (user._id == currentUserData?._id) && user?.friends.map((friend: any, i: number) =>
                        friend?.status == "family" && <div key={i} className='shadow px-2 py-2 border'>
                            <div className="flex justify-between w-full items-center">
                                <Link className='flex items-center' href={`/user/role/${friend?.userName}`}>
                                    <img src={friend?.img} alt="family" className='w-14 h-14 rounded-full object-cover' />
                                    <div className="details px-2">
                                        <h2 className='text-blue-500 font-semibold'>{friend?.displayName}</h2>
                                        <p className='text-black/50 text-xs'>{friend?.displayRole}</p>
                                    </div>

                                </Link>
                                <div className="action relative">
                                    <button onClick={() => toggleAction(friend?.userName)} className={`hover:bg-slate-200 p-2 rounded-full`}>
                                        <Image width={1000} height={1000} src="/icons/threedot-v.svg" alt='family' className='w-5 h-5' />
                                    </button>
                                    <ul className={`control transition-all duration-300 border shadow rounded w-[160px] absolute bg-white right-0 ${actionMember == friend?.userName ? "h-auto z-[50] visible scale-100" : "h-0 -z-[1] invisible scale-0"}`}>
                                        <li className='px-3 py-1 hover:bg-slate-200 transition-all duration-300'>
                                            <Link className='flex gap-3 items-center justify-start text-sm py-2' href={`/user/${friend?.userName}`}>
                                                <Image className='w-4' width={1000} height={1000} src="/icons/profile.svg" alt='family' />
                                                View Profile
                                            </Link>
                                        </li>
                                        <li className='px-3 py-1 hover:bg-slate-200 transition-all duration-300'>
                                            <button onClick={() => handleDeleteMember(friend)} className='bg-transparent outline-none border-none text-sm flex items-center gap-3 py-2'>
                                                <Image className='w-4' width={1000} height={1000} src="/icons/delete.svg" alt='family' />
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                ))
            }
        </div>
    )
}
