'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AllPost from './AllPost/AllPost';

export default function Feeds() {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Our Family Feeds"
    }, [])

    const [attached, setAttached] = useState<any[]>([]);

    const userData = {
        userName: "jayeed",
        email: "email@gmail.com",
        profile: "/assets/user-avatar.jpg"
    }

    const handleUpload = (event: any) => {
        const newFiles = Array.from(event.target.files);
        setAttached([...attached, ...newFiles]);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const name = userData.userName;
        const email = userData.email;
        const profile = userData.profile;
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

    return (
        <div className='feeds'>
            <div className="post-section md:m-1 bg-white shadow rounded-md border">
                <div className="flex flex-col sm:flex-row gap-2 p-5 justify-between">
                    <div className="profile xl:w-14 xl:h-14 md:w-12 md:h-12 w-10 h-10 rounded-full overflow-hidden">
                        <img className='w-full' src={userData?.profile} alt='family' />
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
            </div>

            <AllPost />
        </div>
    )
}
