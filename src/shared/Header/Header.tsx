'use client'
import HomePage from '@/app/home/page';
import { auth, logOut } from '@/components/Authentication/AuthenticationParent';
import LoginAccount from '@/components/Authentication/LoginAccount/LoginAccount';
import Register from '@/components/Authentication/Register/Register';
import FriendList from '@/components/FriendsControls/FriendList';
import FriendsControls from '@/components/FriendsControls/FriendsControls';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';

type ProfileMenuState = '-z-[1] -top-full overflow-hidden h-0' | 'z-[1] top-0 overflow-auto h-auto';
type MainMenuState = true | false;

export default function Header() {
    const [userInfo, setUserInfo] = useState<any>();
    const [loader, setLoader] = useState(true);
    const navigate = useRouter();


    const [profileMenu, setProfileMenu] = useState<ProfileMenuState>("-z-[1] -top-full overflow-hidden h-0");
    const [isOpen, setIsOpen] = useState<MainMenuState>(false);

    const profileClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (userInfo?.user?.uid) {
            setProfileMenu(profileMenu === '-z-[1] -top-full overflow-hidden h-0' ? 'z-[1] top-0 overflow-auto h-auto' : '-z-[1] -top-full overflow-hidden h-0')
        } else {
            navigate.push("/login-account")
        }
    }

    const handleMouseLeave = () => {
        setProfileMenu('-z-[1] -top-full overflow-hidden h-0');
    };

    const openTheMenu = () => {
        setIsOpen(isOpen == true ? false : true);
    };

    const pathname = usePathname();

    const logo = [
        {
            img: '/assets/logo.png'
        }
    ]


    useEffect(() => {
        const Logged = onAuthStateChanged(auth, (user) => {
            setUserInfo({ user });
            setLoader(false);
        })
        return () => {
            Logged();
        }
    }, []);

    const handleLogout = () => {
        logOut()
    }

    return (
        <header className='fixed top-0 left-0 right-0 w-full shadow pt-3 pb-4 z-[200] bg-white'>
            <Toaster />
            {/* auth loader */}
            <div className="hidden">
                <HomePage loader={loader} />
            </div>


            <div className="container md:px-6 mx-auto">
                <nav className='flex justify-between relative px-3'>
                    <div className="logo w-auto">
                        <Link href="/">
                            {
                                logo.map((data: any, i: any) => (
                                    <Image className='w-[50px]' key={i} width={1000} height={1000} src={data.img} alt='family' />
                                ))
                            }
                        </Link>
                    </div>
                    <div className="w-auto menu flex">

                        {/* menubar */}
                        <button onClick={openTheMenu} className='w-8 mx-3 block lg:hidden'>
                            <Image className='w-full' width={1000} height={1000} src="/icons/menubar.svg" alt='family' />
                        </button>

                        <ul className={`flex flex-col lg:flex-row lg:h-full items-start lg:items-center lg:bg-transparent bg-white h-screen lg:shadow-none shadow-lg gap-6 absolute lg:static top-0 left-0 transition-all duration-300 ${isOpen ? "w-auto overflow-auto px-5 lg:px-0 lg:overflow-auto lg:w-auto" : "w-0 overflow-hidden lg:px-0 lg:overflow-auto lg:w-auto"}`}>
                            <li className='block lg:hidden'>
                                <div className="logo w-auto pt-2">
                                    <Link href="/">
                                        {
                                            logo.map((data: any, i: any) => (
                                                <Image className='w-[50px]' key={i} width={1000} height={1000} src={data.img} alt='family' />
                                            ))
                                        }
                                    </Link>
                                </div>
                            </li>
                            <li><Link className={`hover:text-sky-600 font-semibold transition-all duration-500 ${pathname == "/" ? "text-sky-600" : ""}`} href="/">Feeds</Link></li>
                            <li><Link className={`hover:text-sky-600 font-semibold transition-all duration-500 ${pathname == "/timeline" ? "text-sky-600" : ""}`} href="/timeline">Time Line</Link></li>
                            <li><Link className={`hover:text-sky-600 font-semibold transition-all duration-500 ${pathname == "/family-memories" ? "text-sky-600" : ""}`} href="/family-memories">Family Memories</Link></li>
                            <li><Link className={`hover:text-sky-600 font-semibold transition-all duration-500 ${pathname == "/family-tree" ? "text-sky-600" : ""}`} href="/family-tree">Family Tree</Link></li>
                            <li><Link className={`hover:text-sky-600 font-semibold transition-all duration-500 ${pathname == "/calender" ? "text-sky-600" : ""}`} href="/calender">Calender</Link></li>
                            <li><Link className={`hover:text-sky-600 font-semibold transition-all duration-500 ${pathname == "/about" ? "text-sky-600" : ""}`} href="/about">About</Link></li>
                            <li><Link className={`hover:text-sky-600 font-semibold transition-all duration-500 ${pathname == "/contact" ? "text-sky-600" : ""}`} href="/contact">Contact</Link></li>
                        </ul>

                        <div onMouseLeave={handleMouseLeave} className="profile relative ms-6 w-10 h-10 border shadow rounded-full cursor-pointer flex items-center justify-center hover:ring-4 hover:ring-sky-400/50 transition-all duration-300" onClick={profileClick}>
                            <Image className={`w-6`} width={1000} height={1000} src={`/icons/profile.svg`} alt='family' />

                            {/* profile menu */}
                            {
                                userInfo?.user?.uid && <div className={`profile menu absolute right-0 ${profileMenu} transition-all duration-300 w-[180px] pt-11`}>
                                    <ul className='bg-white shadow-md border rounded-md'>
                                        <li className='px-3 py-1 hover:bg-slate-200 transition-all duration-300'>
                                            <Link className='flex gap-3 items-center justify-start text-sm py-2' href="/my-profile">
                                                <Image className='w-5' width={1000} height={1000} src="/icons/profile.svg" alt='family' />
                                                View Profile
                                            </Link>
                                        </li>
                                        <li className='px-3 py-1 hover:bg-slate-200 transition-all duration-300'>
                                            <Link className='flex gap-3 items-center justify-start text-sm py-2' href="/edit-profile">
                                                <Image className='w-5' width={1000} height={1000} src="/icons/edit.svg" alt='family' />
                                                Edit Profile
                                            </Link>
                                        </li>
                                        <li className='px-3 py-1 hover:bg-slate-200 transition-all duration-300'>
                                            <button onClick={handleLogout} className='flex gap-3 items-center justify-start text-sm py-2 bg-transparent border-0 outline-none'>
                                                <Image className='w-5' width={1000} height={1000} src="/icons/power.svg" alt='family' />
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}
