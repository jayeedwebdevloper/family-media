'use client'
import { auth } from '@/components/Authentication/AuthenticationParent';
import UserHeader from '@/components/Profile/UsersProfile/UserHeader';
import UsersProfile from '@/components/Profile/UsersProfile/UsersProfile';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function UserProfilePrev() {
    const { userName } = useParams();
    const [profileRoute, setProfileRoute] = useState("post");
    const [usersData, setUsersData] = useState<any>([]);
    const [userInfo, setUserInfo] = useState<any>();
    const [loader, setLoader] = useState(true);
    const [refetch, setRefetch] = useState(0);
    const [selectedUser, setSelectedUser] = useState<any>(null); // Initialize to null for better loading state management

    useEffect(() => {
        const Logged = onAuthStateChanged(auth, (user) => {
            setUserInfo({ user });
        });
        return () => {
            Logged();
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/family-api/users');
                const data = await response.json();
                setUsersData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoader(false); // Set loader to false after fetching users data
            }
        };
        fetchData();
    }, [refetch]);

    useEffect(() => {
        const fetchSelectedUser = async () => {
            try {
                const response = await fetch(`/family-api/users/username/${userName}`);
                const data = await response.json();
                setSelectedUser(data);
            } catch (error) {
                console.error('Error fetching selected user:', error);
            } finally {
                setLoader(false); // Set loader to false after fetching selected user
            }
        };
        fetchSelectedUser();
    }, [userName, refetch]);

    const triggerRefetch = () => {
        setRefetch(refetch + 1);
    };

    return (
        <div className='mt-20'>
            {loader ? (
                <div className='text-lg w-full h-screen flex items-center justify-center'>
                    Loading...
                </div>
            ) : (
                selectedUser ? (
                    <div>
                        <UserHeader
                            setProfileRoute={setProfileRoute}
                            profileRoute={profileRoute}
                            loader={loader}
                            triggerRefetch={triggerRefetch}
                            selectedUser={selectedUser}
                            userInfo={userInfo}
                            usersData={usersData}
                        />
                        <UsersProfile
                            profileRoute={profileRoute}
                            loader={loader}
                            triggerRefetch={triggerRefetch}
                            selectedUser={selectedUser}
                            userInfo={userInfo}
                            usersData={usersData}
                        />
                    </div>
                ) : (
                    <div className='text-lg w-full h-screen flex items-center justify-center'>
                        User not found
                    </div>
                )
            )}
        </div>
    );
}
