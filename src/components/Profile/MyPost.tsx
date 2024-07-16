'use client'
import React, { useEffect, useState } from 'react'
import CommentsList from '../Home/Feeds/AllPost/CommentsList'
import { ParaGreaph } from '../Home/Feeds/AllPost/ParaGreaph'
import Link from 'next/link'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Authentication/AuthenticationParent'
import Image from 'next/image'
import Profile from './Profile'

type PropsType = {
    profileRoute: string,
    profileCover: any
}

export default function MyPost(props: PropsType) {
    const { profileRoute, profileCover } = props;
    const [userInfo, setUserInfo] = useState<any>();
    const [loader, setLoader] = useState(true);

    const [addReact, setAddReact] = useState(false);

    const handleReact = () => {
        setAddReact(addReact == false ? true : false);
    }


    useEffect(() => {
        const Logged = onAuthStateChanged(auth, (user) => {
            setUserInfo({ user });
            setLoader(false);
        })
        return () => {
            Logged();
        }
    }, []);

    const [attached, setAttached] = useState<any[]>([]);
    const handleUpload = (event: any) => {
        const newFiles = Array.from(event.target.files);
        setAttached([...attached, ...newFiles]);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const name = userInfo?.user.uid;
        const email = userInfo?.user.email;
        const profile = userInfo?.user?.profile;
        const form = event.target;
        const post = form.post.value;
        const files = attached;

        const postData = {
            name, email, profile, post, files
        }

        console.log(postData);

        form.reset();
        setAttached([]);

    }

    console.log(userInfo);
    

    return (
        profileRoute == "post" ? <div className='posts bg-white shadow-md rounded mt-0'>
            <div className="flex flex-col sm:flex-row gap-2 p-5 justify-between">
                <div className="profile xl:w-14 xl:h-14 md:w-12 md:h-12 w-10 h-10 rounded-full overflow-hidden">
                    <img className='w-full' src={userInfo?.user?.profile} alt='family' />
                </div>
                <form onSubmit={handleSubmit} className='border rounded block 2xl:w-[530px] xl:w-[500px] md:w-[320px] sm:w-[480px] w-full'>
                    <textarea name="post" id="post" className='w-full sm:h-24 h-16 px-3 py-1 outline-0 appearance-none border-0 resize-none' placeholder='write something'></textarea>

                    {
                        attached.length > 0 && <p className='text-xs flex gap-2 px-3 font-semibold text-green-700'> Attached:
                            {
                                attached.map((files: any, i: any) => (
                                    <p key={i}>{files.name.substring(0, 5)}..</p>
                                ))
                            }
                        </p>
                    }

                    <div className="flex gap-2 items-center justify-end pe-3 pb-2">
                        <label htmlFor="photo">
                            <Image className='w-6' width={1000} height={1000} src="/icons/image.svg" alt='family' />
                            <input onChange={handleUpload} type="file" name="photo" id="photo" className="appearance-none w-0 h-0 hidden" />
                        </label>
                        <label htmlFor="video">
                            <Image className='w-6' width={1000} height={1000} src="/icons/video.svg" alt='family' />
                            <input onChange={handleUpload} type="file" name="video" id="video" className="appearance-none w-0 h-0 hidden" />
                        </label>

                        <button className='px-5 py-1 bg-sky-500 text-white text-md rounded-md hover:bg-sky-700 transition-all duration-300'>Post</button>
                    </div>
                </form>
            </div>
            {
                profileCover.map((data: any, i: any) => (
                    (data?.posts.length > 0) ? data.posts.map((post: any, i: number) => (
                        (post?.category == "personal") && (post?.psts) && post.psts.map((pst: any, i: number) => (
                            <div key={i} className='px-3 py-4'>
                                <div className="header flex justify-start gap-4">
                                    <img className='w-10 rounded-full' src={data.avatar} alt="family" />
                                    <div className="w-auto">
                                        <Link href={`/user/${data.userName}`} className='text-sky-500 font-bold capitalize text-sm'>{data.userName}</Link>
                                        <p className='text-xs text-stone-500'>Published: {pst.date}</p>
                                    </div>
                                </div>

                                <div className="content-post">
                                    {
                                        pst?.post.para ? <ParaGreaph id={pst?.id} post={pst.post.para}></ParaGreaph> : undefined
                                    }
                                    {
                                        pst?.post.img != "" && <img key={i} className='w-full h-auto' src={pst.post.img} alt="family" />
                                    }
                                </div>

                                <div className="reacts flex gap-4 py-2">
                                    <button onClick={handleReact} className='flex gap-1 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill={addReact ? 'rgb(0, 115, 255)' : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 hover:scale-125">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                        </svg>
                                        <span className='text-xs'>
                                            {
                                                pst?.post.comments.length > 0 && pst.post.comments.reduce((prevIndex: number | undefined, cmnt: any, i: number) =>
                                                    cmnt.rated ? i : prevIndex, -1)}
                                        </span>
                                    </button>
                                    <div className='text-xs flex gap-1 items-center'>
                                        <img src="/icons/comment.svg" alt="family" className='w-4' />
                                        <p>
                                            {pst.post.comments.length}
                                        </p>
                                    </div>
                                    <button className='text-xs flex gap-1 items-center'>
                                        <img src="/icons/share.svg" alt="family" className='w-4' />
                                    </button>
                                </div>

                                <div className="comments">
                                    {/* <CommentsList data={pst} /> */}

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
                    )) : <p>you didn't post yet</p>
                ))
            }
        </div> : profileRoute == "about" && <Profile profileCover={profileCover} />
    )
}
