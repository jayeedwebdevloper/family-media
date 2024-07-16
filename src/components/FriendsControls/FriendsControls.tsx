'use client'
import React, { useEffect, useState } from 'react';
import FriendList from './FriendList';

export default function FriendsControls({ userInfo }: { userInfo: any }) {
    const [findFrnd, setFindFrnd] = useState("find");

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
        window.scrollTo(0, 0);
        document.title = "Find Friends"
    }, [])

  return (
      <div className='friend bg-white'>
          <div className="header flex gap-3">
              <button onClick={() => setFindFrnd("find")} className={`px-3 py-3 text-md font-semibold border-b-[3px] ${findFrnd == "find" ? "text-blue-500 border-b-[3px] border-blue-500" : "border-transparent"}`}>
                  Find Friend
              </button>
              <button onClick={() => setFindFrnd("request")} className={`px-3 py-3 text-md font-semibold border-b-[3px] ${findFrnd == "request" ? "text-blue-500 border-b-[3px] border-blue-500" : "border-transparent"}`}>
                  Friend Request
              </button>
          </div>

          <div className="pt-2">
              <FriendList usersData={usersData} findFrnd={findFrnd} />
          </div>
      </div>
  )
}
