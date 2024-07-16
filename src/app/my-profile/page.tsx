'use client'
import MyFamily from '@/components/Profile/MyFamily';
import MyFriends from '@/components/Profile/MyFriends';
import MyPost from '@/components/Profile/MyPost';
import React, { useState } from 'react'

export default function MyProfilePage() {
    const [profileRoute, setProfileRoute] = useState("post");
    const profileCover = [
        {
            id: 1,
            bgi: "/assets/user-post2.jpg",
            avatar: "/assets/user-avatar.jpg",
            username: "user1",
            displayName: "User",
            posts: [
                {
                    id: 1,
                    category: "ingroup",
                    psts: [
                        {
                            id: 1,
                            date: "12-may-2022 2:50",
                            post: {
                                img: "/assets/user-post2.jpg",
                                para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu, efficitur ut ante. Curabitur a velit sed lorem laoreet bibendum. Ut ac velit dapibus, dapibus ex vel, ullamcorper lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras eget dolor non ligula efficitur tristique.",
                                comments: [
                                    {
                                        id: 1,
                                        rated: true,
                                        username: "user2",
                                        displayName: "user 2",
                                        avatar: "/assets/anika.jpg",
                                        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu"
                                    },
                                    {
                                        id: 2,
                                        rated: false,
                                        username: "user2",
                                        displayName: "user 2",
                                        avatar: "/assets/anika.jpg",
                                        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu"
                                    },
                                    {
                                        id: 3,
                                        rated: true,
                                        username: "user2",
                                        displayName: "user 2",
                                        avatar: "/assets/anika.jpg",
                                        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu"
                                    },
                                    {
                                        id: 4,
                                        rated: true,
                                        username: "user2",
                                        displayName: "user 2",
                                        avatar: "/assets/anika.jpg",
                                        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu"
                                    },
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 2,
                    category: "personal",
                    psts: [
                        {
                            id: 1,
                            date: "12-may-2022 2:50",
                            post: {
                                img: "/assets/user-post2.jpg",
                                para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu, efficitur ut ante. Curabitur a velit sed lorem laoreet bibendum. Ut ac velit dapibus, dapibus ex vel, ullamcorper lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras eget dolor non ligula efficitur tristique.",
                                comments: [
                                    {
                                        id: 1,
                                        rated: true,
                                        username: "user2",
                                        displayName: "user 2",
                                        avatar: "/assets/anika.jpg",
                                        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu"
                                    },
                                    {
                                        id: 2,
                                        rated: false,
                                        username: "user2",
                                        displayName: "user 2",
                                        avatar: "/assets/anika.jpg",
                                        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu"
                                    },
                                    {
                                        id: 3,
                                        rated: true,
                                        username: "user2",
                                        displayName: "user 2",
                                        avatar: "/assets/anika.jpg",
                                        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu"
                                    },
                                    {
                                        id: 4,
                                        rated: false,
                                        username: "user2",
                                        displayName: "user 2",
                                        avatar: "/assets/anika.jpg",
                                        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu"
                                    },
                                ]
                            }
                        }
                    ]
                },
            ],
            about: {
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                location: "New York",
                phoneNumber: "12344555444",
                website: "www.example.com"
            },
            interest: [
                "football",
                "internet",
                "photography"
            ],
            language: [
                "english",
                "spanish",
                "french"
            ],
            friends: [
                {
                    id: 1,
                    username: "anika2",
                    displayName: "Anika 2",
                    avatar: "/assets/anika.jpg"
                },
                {
                    id: 2,
                    username: "anika2",
                    displayName: "Anika 2",
                    avatar: "/assets/anika.jpg"
                },
                {
                    id: 3,
                    username: "anika2",
                    displayName: "Anika 2",
                    avatar: "/assets/anika.jpg",
                    status: "family"
                },
            ]
        }
    ];

    return (
        <div className='pt-0 bg-stone-100'>
            <div className="container mx-auto px-0 md:px-6">
                <div className="profile-header shadow rounded relative">
                    {
                        profileCover.map((bg: any, i: number) => (
                            <div key={i} className={`w-full h-[300px] mt-[75px] ${!bg?.bgi && "flex items-center justify-center bg-slate-300"}`}>
                                {
                                    bg?.bgi ? <img className='w-full h-full object-cover rounded' src={bg.bgi} alt="family" /> : <h1 className='font-bold text-black/50 text-xl'>Cover Photo Not Added</h1>
                                }
                            </div>
                        ))
                    }
                    {
                        profileCover.map((dp: any, i: number) => (
                            <div key={i} className={`border-2 border-white shadow-md w-40 h-40 rounded-full absolute left-7 -bottom-8 overflow-hidden ${!dp?.avatar && "bg-slate-400 flex justify-center items-center"}`}>
                                {
                                    dp?.avatar ? <img className='w-full object-cover' src={dp.avatar} alt="family" /> : <h1 className='text-sm font-semibold'>Not Added</h1>
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="flex w-full bg-white shadow justify-center items-center">
                    <div className="py-6 ps-[200px] justify-self-start flex-1">
                        {
                            profileCover.map((dp: any, i: number) => (
                                <h1 className='text-blue-500 font-bold ' key={i}>{dp.displayName}</h1>
                            ))
                        }
                    </div>
                    <ul className="flex gap-3 pe-8">
                        <li>
                            <button onClick={() => setProfileRoute("post")} className={`w-[70px] ${profileRoute == "post" ? "text-blue-500 font-semibold" : ""}`}>Post</button>
                        </li>
                        <li>
                            <button onClick={() => setProfileRoute("about")} className={`w-[70px] ${profileRoute == "about" ? "text-blue-500 font-semibold" : ""}`}>About</button>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col md:flex-row gap-3 justify-center h-full pb-4">
                    <div>
                        <div className="h-fit bg-white w-[300px] mt-[10px] shadow rounded px-4 py-2 overflow-x-auto overflow-y-scroll custom-scroll hidden lg:block">
                            <h2 className='text-lg py-1 font-semibold text-blue-950 border-b-2 border-b-sky-500'>My Friends</h2>
                            <MyFriends profileRoute={profileRoute} profileCover={profileCover} />
                        </div>
                    </div>

                    <div className="xl:w-[700px] md:w-[550px] w-full h-auto mt-[10px] pb-2 overflow-x-hidden overflow-y-scroll custom-scroll rounded">
                        <MyPost profileRoute={profileRoute} profileCover={profileCover} />
                    </div>

                    <div className="h-fit bg-white w-full md:w-[300px] mt-[10px] shadow rounded px-4 py-2 custom-scroll">
                        <h2 className='text-lg py-1 font-semibold text-blue-950 border-b-2 border-b-sky-500'>My Family</h2>
                        <MyFamily profileRoute={profileRoute} profileCover={profileCover} />
                    </div>
                </div>
            </div>
        </div>
    )
}