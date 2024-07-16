import Link from 'next/link'
import React, { useState } from 'react'
import { ParaGreaph } from './ParaGreaph'
import CommentsList from './CommentsList';

export default function AllPost() {

    const [addReact, setAddReact] = useState(false);

    const handleReact = () => {
        setAddReact(addReact == false ? true : false);
    }

    const allPostData = [
        {
            id: 1,
            userName: "user 1",
            profileImg: "/assets/user-avatar.jpg",
            times: {
                date: "jun-18-2024",
                time: "19:43"
            },
            posts: {
                post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu, efficitur ut ante. Curabitur a velit sed lorem laoreet bibendum. Ut ac velit dapibus, dapibus ex vel, ullamcorper lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras eget dolor non ligula efficitur tristique.",
                files: [
                    "/assets/user-post.jpg"
                ]
            },
            reacts: [
                {
                    id: 1,
                    userName: "user 1",
                },
                {
                    id: 2,
                    userName: "user 2",
                },
                {
                    id: 3,
                    userName: "user 3",
                }
            ],
            comments: [
                {
                    id: 1,
                    userName: "user 1",
                    profile: "/assets/user-avatar.jpg",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis"
                },
                {
                    id: 2,
                    userName: "user 2",
                    profile: "/assets/user-avatar.jpg",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis"
                },
                {
                    id: 3,
                    userName: "user 3",
                    profile: "/assets/user-avatar.jpg",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis"
                },
                {
                    id: 4,
                    userName: "user 4",
                    profile: "/assets/user-avatar.jpg",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis"
                }
            ]
        },
        {
            id: 2,
            userName: "user 2",
            profileImg: "/assets/user-avatar.jpg",
            times: {
                date: "jul-18-2024",
                time: "12:43"
            },
            posts: {
                post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis sapien, egestas nec mattis eu, efficitur ut ante. Curabitur a velit sed lorem laoreet bibendum. Ut ac velit dapibus, dapibus ex vel, ullamcorper lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras eget dolor non ligula efficitur tristique.",
                files: [
                    "/assets/user-post.jpg"
                ]
            },
            reacts: [
                {
                    id: 1,
                    userName: "user 1",
                },
                {
                    id: 2,
                    userName: "user 2",
                },
                {
                    id: 3,
                    userName: "user 3",
                }
            ],
            comments: [
                {
                    id: 1,
                    userName: "user 1",
                    profile: "/assets/user-avatar.jpg",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis"
                },
                {
                    id: 2,
                    userName: "user 2",
                    profile: "/assets/user-avatar.jpg",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis"
                },
                {
                    id: 3,
                    userName: "user 3",
                    profile: "/assets/user-avatar.jpg",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis"
                },
                {
                    id: 4,
                    userName: "user 4",
                    profile: "/assets/user-avatar.jpg",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et est turpis. Vestibulum turpis"
                }
            ]
        },
    ]

    return (
        <div className='posts bg-white shadow-md rounded m-1 mt-2'>
            {
                allPostData.map((data: any, i: any) => (
                    <div key={i} className='px-3 py-4'>
                        <div className="header flex justify-start gap-4">
                            <img className='w-10 rounded-full' src={data.profileImg} alt="family" />
                            <div className="w-auto">
                                <Link href={`/user/${data.userName}`} className='text-sky-500 font-bold capitalize text-sm'>{data.userName}</Link>
                                <p className='text-xs text-stone-500'>Published: <span>{data.times.date}</span> <span>{data.times.time}</span></p>
                            </div>
                        </div>

                        <div className="content-post">
                            {
                                data.posts?.post ? <ParaGreaph id={i} post={data.posts.post}></ParaGreaph> : undefined
                            }
                            {
                                data.posts.files.length > 0 && data.posts.files.map((file: any, i: any) => (
                                    <img key={i} className='w-full h-auto' src={file} alt="family" />
                                ))
                            }
                        </div>

                        <div className="reacts flex gap-4 py-2">
                            <button onClick={handleReact} className='flex gap-1 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill={addReact ? 'rgb(0, 115, 255)' : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 hover:scale-125">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>
                                <span className='text-xs'>{data.reacts.length}</span>
                            </button>
                            <div className='text-xs flex gap-1 items-center'>
                                <img src="/icons/comment.svg" alt="family" className='w-4' />
                                <p>
                                    {data.comments.length}
                                </p>
                            </div>
                            <button className='text-xs flex gap-1 items-center'>
                                <img src="/icons/share.svg" alt="family" className='w-4' />
                            </button>
                        </div>

                        <div className="comments">
                            <CommentsList data={data} />

                            <div className='shadow rounded p-2 border flex flex-col sm:flex-row justify-between'>
                                <div className="2xl:w-14 xl:w-12 w-10">
                                    <img className='rounded-full' src="/assets/user-avatar.jpg" alt="" />
                                </div>
                                <form className="w-auto">
                                    <label htmlFor={`comment${i}`} className='block'>Comment</label>
                                    <textarea className='2xl:w-[540px] xl:w-[500px] md:w-[320px] sm:w-[450px] w-full outline-none border focus:ring-1 focus:ring-blue-500 px-3 py-2 text-sm rounded' name="comment" id={`comment${i}`}></textarea>
                                    <button className='block ms-auto px-3 py-1 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-all duration-300'>Send</button>
                                </form>
                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}
