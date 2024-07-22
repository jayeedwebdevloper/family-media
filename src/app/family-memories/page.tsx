'use client'
import { auth } from '@/components/Authentication/AuthenticationParent'
import FamilyGroup from '@/components/FamilyGroup/FamilyGroup'
import FamilyMemories from '@/components/FamilyGroup/FamilyMemories'
import MemberList from '@/components/FamilyGroup/MemberList'
import Shortcut from '@/components/Home/Shortcut/Shortcut'
import Memories from '@/components/Memories/Memories'
import { onAuthStateChanged } from 'firebase/auth'
import { CldUploadWidget } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'

export default function MyFamily() {

    const [openModal, setOpenModal] = useState("hidden");
    const [selectOption, setSelectOption] = useState("");

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

    const handleAddMember = (e: any) => {
        e.preventDefault();
        const form = e.target;
        const member = form.member.value;
        const role = form.role?.value;
        const displayRole = form.displayRole?.value;
        const role2 = form.role2?.value;
        const displayRole2 = form.displayRole2?.value;


        const friendData = usersData?.find((user: any) => user.userName == member)
        const currentUserCheck = usersData?.find((user: any) => user?.uid == userInfo?.user?.uid);
        const friend = currentUserCheck.friends.find((friend: any) => friend.uid == friendData.uid)

        const user = currentUserCheck._id;
        const addFamily = {
            userId: user,
            friend: {
                ...friend,
                status: "family",
                displayRole,
                role
            }
        }

        const secondUser = usersData.find((user: any) => user.uid == friend.uid);
        const user2 = secondUser._id;
        const friend2 = secondUser.friends.find((friend: any) => friend.uid == currentUserCheck.uid)

        const addFamily2 = {
            userId: user2,
            friend: {
                ...friend2,
                status: "family",
                displayRole: displayRole2,
                role: role2
            }
        }

        // console.log(addFamily, addFamily2);

        fetch(`/family-api/users/${user}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addFamily)
        })
            .then(res => res.json())
            .then(data => {
                fetch(`/family-api/users/${user2}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(addFamily2)
                })
                    .then(res => res.json())
                    .then(data => {

                        triggerRefetch();
                    })
            })
        setOpenModal("hidden");
        setSelectOption("");
        form.reset();
    }


    const [selectedMemories, setSelectMemories] = useState<string>("");
    const [memoryPage, setMemoryPage] = useState<any>();


    const [usersData, setUsersData] = useState<any>([]);
    const [refetch, setRefetch] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/family-api/users');
                const data = await response.json();
                setUsersData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [refetch]);

    const triggerRefetch = () => {
        setRefetch(refetch + 1);
    };

    const [foundGroup, setFoundGroup] = useState(false);
    const currentUser = usersData?.find((user: any) => user?.uid == userInfo?.user?.uid);

    const [postPhoto, setPostPhoto] = useState<any>();
    const [hitCreate, setHitCreate] = useState(false);

    const handleCreate = (e: any) => {
        e.preventDefault();
        if (hitCreate != true) {
            return;
        } else {
            setLoader(true)
            const form = e.target;
            const groupName = form.groupName.value;
            const coverPhoto = postPhoto?.secure_url || '';

            fetch('/family-api/groups', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ groupName, coverPhoto, admin: currentUser._id })
            }).then(res => res.json())
                .then(dataG => {
                    fetch('/family-api/groups', {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ groupId: dataG.insertedId, userId: currentUser._id })
                    }).then(res => res.json())
                        .then(data => {
                            fetch('/family-api/users/groups', {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ groupId: dataG.insertedId, userId: currentUser._id })
                            }).then(res => res.json())
                                .then(data => {
                                    triggerRefetch()
                                    setLoader(false);
                                    setHitCreate(false);
                                    setPostPhoto(null);
                                    setFoundGroup(false);
                                })
                        })
                })
        }
    }

    const [groupData, setGroupData] = useState<any>([]);
    useEffect(() => {
        fetch('/family-api/groups')
            .then(res => res.json())
            .then(data => setGroupData(data))
    }, [refetch]);

    const currentGroup = groupData?.find((group: any) => group._id == (currentUser?.groups?.map((grp: any) => grp.groupId)));
    // console.log(currentGroup)

    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        if (currentUser) {
            setDataLoaded(true)
        } else {
            setDataLoaded(false)
        }
    }, [currentUser])

    const [changeCoverPhoto, setChangeCover] = useState<any>(undefined);

    return (
        loader ? <div className='text-lg w-full h-screen flex items-center justify-center bg-slate-200'>Loading...</div> : dataLoaded != true ? <div className='text-lg w-full h-screen flex items-center justify-center bg-slate-200'>Loading...</div> :
            (currentUser?.groups.length ?
                <div className='overflow-hidden relative w-full bg-stone-100'>
                    <div className="container mx-auto md:px-6 px-2">
                        <div className="group-header shadow rounded relative">
                            {
                                currentGroup?.coverPhoto ?
                                    <div className={`w-full h-[300px] mt-[75px]`}>
                                        <img className='w-full h-full object-cover rounded' src={currentGroup?.coverPhoto} alt="family" />
                                    </div>
                                    : <div className='w-full h-[300px] mt-[75px] flex items-center justify-center text-xl font-bold text-black/50 bg-slate-100'>Cover Photo Not Added</div>
                            }
                            <div className='w-[150px] flex justify-center items-center absolute bottom-0 left-0'>
                                <CldUploadWidget
                                    options={{
                                        multiple: false
                                    }}
                                    uploadPreset="family_preset"
                                    onSuccess={(result, { widget }) => {
                                        setChangeCover(result?.info);  // { public_id, secure_url, etc }
                                        widget.close();
                                    }}
                                >
                                    {({ open }) => {
                                        function handleOnClick() {
                                            setChangeCover(undefined);
                                            open();
                                        }
                                        return (
                                            <button className='rounded-md py-2 px-3 bg-black/50 text-white' onClick={handleOnClick}>
                                                Change Photo
                                            </button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </div>

                            {/* add member */}
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
                                        </select>
                                    </div>
                                    {
                                        selectOption == "friend" && <div>
                                            <label className='block pb-1 text-sm'>Select</label>
                                            <select name="member" defaultValue="Select" className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md cursor-pointer capitalize'>
                                                <option disabled>Select</option>
                                                {
                                                    usersData.map((users: any, i: number) => (
                                                        (users.friends.find((frnd: any) => frnd.uid == userInfo?.user?.uid)) && users?.friends.find((frnd: any) => frnd.status == "friend") && <option key={i} value={users.userName}>{users.displayName}</option>
                                                    ))
                                                }
                                            </select>
                                            <div className="py-1">
                                                <label htmlFor={`displayRole`} className='block pb-1 text-sm'>Who ?</label>
                                                <input required id='displayRole' name='displayRole' type="text" placeholder='Sister' className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md text-sm' />
                                            </div>
                                            <div className="py-1">
                                                <label htmlFor={`displayRole2`} className='block pb-1 text-sm'>You are ?</label>
                                                <input required id='displayRole2' name='displayRole2' type="text" placeholder='Brother' className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md text-sm' />
                                            </div>
                                            <div className="py-1">
                                                <label htmlFor={`role`} className='text-sm leading-[0.1] block pb-1'>Keyword <span className='text-xs text-red-600'>(Only one keyword and no space and no special character)</span></label>
                                                <input required id='role' name='role' type="text" placeholder='sister' className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md text-sm' />
                                            </div>
                                            <div className="py-1">
                                                <label htmlFor={`role2`} className='text-sm leading-[0.1] block pb-1'>Keyword (your role) <span className='text-xs text-red-600'>(Only one keyword and no space and no special character)</span></label>
                                                <input required id='role2' name='role2' type="text" placeholder='brother' className='w-full outline-none border-none ring-1 ring-black/50 px-1 py-1 rounded-md text-sm' />
                                            </div>
                                        </div>
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
                                    selectedMemories == "" ? <FamilyGroup userInfo={userInfo} usersData={usersData} triggerRefetch={triggerRefetch} currentUser={currentUser} currentGroup={currentGroup} /> : <FamilyMemories memoryPage={memoryPage} />
                                }
                            </div>

                            <div className="h-fit bg-white w-full md:w-[300px] mt-[10px] shadow rounded px-4 py-2 custom-scroll">
                                <h2 className='text-lg py-1 font-semibold text-blue-950 border-b-2 border-b-sky-500'>Family Members</h2>
                                <button className='bg-blue-500 hover:bg-blue-600 w-full block my-1 py-1 rounded-md text-white transition-all duration-300' onClick={() => setOpenModal("block")}>Add Member</button>
                                <MemberList usersData={usersData} triggerRefetch={triggerRefetch} userInfo={userInfo} loader={loader} setLoader={setLoader} currentGroup={currentGroup} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='w-full h-screen flex items-center justify-center bg-slate-300 relative'>
                    <div className={`absolute left-0 top-20 right-0 bg-black/70 w-full h-full transition-all duration-300 ${foundGroup ? "visible scale-100" : "invisible scale-0"}`}>
                        <p className='text-lg font-bold text-white text-end py-1 px-3 cursor-pointer' onClick={() => setFoundGroup(false)}>⨉</p>
                        <form onSubmit={handleCreate} className='px-3 py-1 bg-white rounded-md shadow-md w-full sm:w-[500px] mx-auto mt-2'>
                            <h1 className='text-lg font-bold pt-1 pb-5'>Create a family group</h1>
                            <div className="py-1">
                                <input required type="text" placeholder='Family Name' className='text-sm py-2 px-3 w-full outline-none border-b-2' name='groupName' />
                            </div>
                            <div className="py-1">
                                <CldUploadWidget
                                    options={{
                                        multiple: false
                                    }}
                                    uploadPreset="family_preset"
                                    onSuccess={(result, { widget }) => {
                                        setPostPhoto(result?.info);  // { public_id, secure_url, etc }
                                        widget.close();
                                    }}
                                >
                                    {({ open }) => {
                                        function handleOnClick() {
                                            setPostPhoto(undefined);
                                            open();
                                        }
                                        return (
                                            <button className='border-2 rounded-md flex flex-col gap-2 items-center justify-center w-full h-[150px] overflow-hidden' onClick={handleOnClick}>
                                                {
                                                    postPhoto ? (
                                                        <img className='preview w-full object-cover' src={postPhoto?.thumbnail_url} alt='cover photo' />
                                                    ) : (
                                                        <>
                                                            <p className='text-black/50'>Upload Cover Photo</p>
                                                            <img src="/icons/prev.svg" alt="family" />
                                                        </>
                                                    )
                                                }
                                            </button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </div>
                            <div className="py-1">
                                <button onClick={() => setHitCreate(true)} className='bg-blue-500 hover:bg-blue-700 text-white py-1 w-full px-3 rounded-md transition-all duration-300'>Create</button>
                            </div>
                        </form>
                    </div>
                    <button onClick={() => setFoundGroup(true)} className='text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300 py-2 px-3 rounded-md'>Create a family group</button>
                </div>)
    )
}
