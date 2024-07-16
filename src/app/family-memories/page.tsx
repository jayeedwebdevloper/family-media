'use client'
import { auth } from '@/components/Authentication/AuthenticationParent'
import FamilyGroup from '@/components/FamilyGroup/FamilyGroup'
import FamilyMemories from '@/components/FamilyGroup/FamilyMemories'
import MemberList from '@/components/FamilyGroup/MemberList'
import Shortcut from '@/components/Home/Shortcut/Shortcut'
import Memories from '@/components/Memories/Memories'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

export default function MyFamily() {

    const [openModal, setOpenModal] = useState("hidden");
    const [selectOption, setSelectOption] = useState("");

    const [userInfo, setUserInfo] = useState<any>();
    const [loader, setLoader] = useState(true);

    const usersData = [
        {
            id: 1,
            username: "anika jayeed",
            friends: [
                {
                    id: 1,
                    username: "pVVJVutNSDViZFBpbGArBDAG4e43",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            status: "family",
            displayName: "Anika",
            img: "/assets/anika.jpg"
        },
        {
            id: 2,
            username: "anika2",
            friends: [
                {
                    id: 1,
                    username: "pVVJVutNSDViZFBpbGArBDAG4e43",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            status: "family",
            displayName: "Anika",
            img: "/assets/anika2.jpeg"
        },
        {
            id: 2,
            username: "anika",
            friends: [
                {
                    id: 1,
                    username: "pVVJVutNSDViZFBpbGArBDAG4e43",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            status: "family",
            displayName: "Anika",
            img: "/assets/anika.jpg"
        },
        {
            id: 4,
            username: "anika2",
            friends: [
                {
                    id: 1,
                    username: "pVVJVutNSDViZFBpbGArBDAG4e43",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            status: "family",
            displayName: "Anika",
            img: "/assets/anika2.jpeg"
        },
        {
            id: 5,
            username: "anika",
            friends: [
                {
                    id: 1,
                    username: "pVVJVutNSDViZFBpbGArBDAG4e43",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            status: "family",
            displayName: "Anika",
            img: "/assets/anika.jpg"
        },
        {
            id: 6,
            username: "anika2",
            friends: [
                {
                    id: 1,
                    username: "pVVJVutNSDViZFBpbGArBDAG4e43",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            status: "family",
            displayName: "Anika",
            img: "/assets/anika2.jpeg"
        },
        {
            id: 7,
            username: "anika3",
            friends: [
                {
                    id: 1,
                    username: "sdsfs",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            status: "pending",
            displayName: "Anika",
            img: "/assets/anika2.jpeg"
        },
        {
            id: 8,
            username: "anika3",
            friends: [
                {
                    id: 1,
                    username: "sdsfs",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            status: "pending",
            displayName: "Anika",
            img: "/assets/anika2.jpeg"
        },
        {
            id: 9,
            username: "anika2",
            friends: [
                {
                    id: 1,
                    username: "sdsfs",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            displayName: "Anika",
            img: "/assets/anika2.jpeg"
        },
        {
            id: 10,
            username: "anika",
            friends: [
                {
                    id: 1,
                    username: "sdsfs",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            displayName: "Anika",
            img: "/assets/anika.jpg"
        },
        {
            id: 11,
            username: "anika2",
            friends: [
                {
                    id: 1,
                    username: "sdsfs",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            displayName: "Anika",
            img: "/assets/anika2.jpeg"
        },
        {
            id: 12,
            username: "anika",
            friends: [
                {
                    id: 1,
                    username: "sdsfs",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            displayName: "Anika",
            img: "/assets/anika.jpg"
        },
        {
            id: 13,
            username: "anika2",
            friends: [
                {
                    id: 1,
                    username: "sdsfs",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            displayName: "Anika",
            img: "/assets/anika2.jpeg"
        },
        {
            id: 14,
            username: "anika",
            friends: [
                {
                    id: 1,
                    username: "sdsfs",
                    name: "jayeed",
                },
                {
                    id: 2,
                    username: "asadgwwsafsf",
                    name: "anika",
                }
            ],
            displayName: "Anika",
            img: "/assets/anika.jpg"
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

    const handleAddMember = (e: any) => {
        e.preventDefault();
        const form = e.target;
        const member = form.member?.value;
        const role = form.role?.value;
        const displayRole = form.displayRole?.value;
        const displayName = form.displayName?.value;
        const img = form.photo?.value;

        const memberData = {
            member, role, displayName, displayRole, img
        }

        console.log(memberData)
        setOpenModal("hidden");
        setSelectOption("");
        form.reset();
    }


    const familyPhoto = [
        {
            id: 1,
            bgi: "/assets/user-post2.jpg"
        }
    ];

    const [selectedMemories, setSelectMemories] = useState<string>("");
    const [memoryPage, setMemoryPage] = useState<any>();
    console.log(selectedMemories);


    return (
        <div className='overflow-hidden relative w-full bg-stone-100'>
            <div className="container mx-auto md:px-6 px-2">
                <div className="group-header shadow rounded relative">
                    {
                        familyPhoto.map((bg: any, i: number) => (
                            <div key={i} className={`w-full h-[300px] mt-[75px]`}>
                                <img className='w-full h-full object-cover rounded' src={bg.bgi} alt="family" />
                            </div>
                        ))
                    }
                    <form className='w-[130px] flex justify-center items-center absolute bottom-0 left-0'>
                        <label htmlFor="changePhoto" className='block bg-black/50 hover:bg-black/70 cursor-pointer w-full text-white py-2 text-center'>
                            Change Photo
                            <input className='appearance-none h-0 w-0' type="file" name="bgi" id="changePhoto" />
                        </label>
                    </form>
                    <div className={`w-full h-screen fixed left-0 right-0 top-0 bg-black/50 flex items-center justify-center ${openModal}`}>
                        <form onSubmit={handleAddMember} className='w-[310px] p-3 bg-white rounded-md'>
                            <div className="flex justify-between items-center">
                                <h1 className='text-md font-semibold'>Add Member</h1>
                                <p onClick={() => setOpenModal("hidden")} className='text-black/50 text-end cursor-pointer'>✕</p>
                            </div>
                            <div className="py-1">
                                <select onChange={(e) => setSelectOption(e.target.value)} name="from" className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md cursor-pointer' defaultValue="Select">
                                    <option disabled>Select</option>
                                    <option value="friend">From your friend list</option>
                                    <option value="out">From out of friend list</option>
                                </select>
                            </div>
                            {
                                selectOption == "friend" ? <div>
                                    <label className='block pb-1 text-sm'>Select</label>
                                    <select name="member" defaultValue="Select" className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md cursor-pointer'>
                                        <option disabled>Select</option>
                                        {
                                            usersData.map((users: any, i: number) => (
                                                (users.friends.find((frnd: any) => frnd.username == userInfo?.user?.uid)) && <option key={i} value={users.username}>{users.displayName}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="py-1">
                                        <label htmlFor={`displayRole`} className='block pb-1 text-sm'>Who ?</label>
                                        <input required id='displayRole' name='displayRole' type="text" placeholder='Grand Mother' className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md text-sm' />
                                    </div>
                                    <div className="py-1">
                                        <label htmlFor={`role`} className='text-sm leading-[0.1] block pb-1'>Keyword <span className='text-xs text-red-600'>(Only one keyword and no space and no special character)</span></label>
                                        <input required id='role' name='role' type="text" placeholder='grandmother' className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md text-sm' />
                                    </div>
                                </div> : selectOption == "out" ? <div>
                                    <div className="py-1">
                                        <label htmlFor={`displayRole`} className='block pb-1 text-sm'>Who ?</label>
                                        <input required id='displayRole' name='displayRole' type="text" placeholder='Grand Mother' className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md text-sm' />
                                    </div>
                                    <div className="py-1">
                                        <label htmlFor={`role`} className='text-sm leading-[0.1] block pb-1'>Keyword <span className='text-xs text-red-600'>(Only one keyword and no space and no special character)</span></label>
                                        <input required id='role' name='role' type="text" placeholder='grandmother' className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md text-sm' />
                                    </div>
                                    <div className="py-1">
                                        <label htmlFor={`displayName`} className='block pb-1 text-sm'>Name</label>
                                        <input required id='displayName' name='displayName' type="text" placeholder='Miky Doe' className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md text-sm' />
                                    </div>
                                    <div className="py-1">
                                        <label htmlFor={`photo`} className='block pb-1 text-sm'>Avatar</label>
                                        <input required id='photo' name='photo' type="file" className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md text-sm' />
                                    </div>
                                </div> : <p>Please
                                    select a option
                                </p>
                            }
                            <button className='w-full block mt-2 rounded bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white text-md py-1'>Add</button>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 justify-center h-full pb-4">
                    <div>
                        <div className="h-fit bg-white w-[300px] mt-[10px] shadow rounded px-4 py-2 overflow-x-auto overflow-y-scroll custom-scroll hidden lg:block">
                            <h2 className='text-lg py-1 font-semibold text-blue-950 border-b-2 border-b-sky-500'>Shortcut</h2>
                            <Shortcut />
                        </div>
                        <div className="h-fit bg-white w-[300px] mt-[10px] shadow rounded px-4 py-2 overflow-x-auto overflow-y-scroll custom-scroll hidden lg:block">
                            <h2 className='text-lg py-1 font-semibold text-blue-950 border-b-2 border-b-sky-500'>Memories</h2>
                            <Memories setSelectMemories={setSelectMemories} selectedMemories={selectedMemories} setMemoryPage={setMemoryPage} />
                        </div>
                    </div>

                    <div className="xl:w-[700px] md:w-[550px] w-full h-auto mt-[10px] pb-2 overflow-x-hidden overflow-y-scroll custom-scroll rounded">
                        {
                            selectedMemories == "" ? <FamilyGroup /> : <FamilyMemories memoryPage={memoryPage} />
                        }
                    </div>

                    <div className="h-fit bg-white w-full md:w-[300px] mt-[10px] shadow rounded px-4 py-2 custom-scroll">
                        <h2 className='text-lg py-1 font-semibold text-blue-950 border-b-2 border-b-sky-500'>Family Members</h2>
                        <button className='bg-blue-500 hover:bg-blue-600 w-full block my-1 py-1 rounded-md text-white transition-all duration-300' onClick={() => setOpenModal("block")}>Add Member</button>
                        <MemberList />
                    </div>
                </div>
            </div>
        </div>
    )
}
