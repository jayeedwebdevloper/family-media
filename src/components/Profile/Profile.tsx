import Image from 'next/image';
import React, { useState } from 'react';
import BasicInfo from './MyAbout/BasicInfo';
import Interset from './MyAbout/Interset';
import Language from './MyAbout/Language';

type PropsType = {
  profileCover: any,
}

export default function Profile(props: PropsType) {
  const { profileCover } = props;

  const [aboutRoute, setAboutRoute] = useState("basic");

  return (
    <div className='bg-white rounded-md shadow-md py-2 px-4'>
      <div className="flex items-center gap-2 py-2">
        <Image className='size-5' width={1000} height={1000} src="/icons/info.svg" alt='family' />
        <h4 className='text-black/70 font-semibold text-xl'>Personal Info</h4>
      </div>
      {
        profileCover.map((info: any, i: number) => (
          <p className='text-sm leading-[1.3] text-black/70 py-2'>{info?.about?.desc}</p>
        ))
      }

      <div className="pb-2 pt-5">
        <div className="flex h-auto">
          <div className="w-full md:w-1/3 bg-slate-200">
            <ul className='w-full'>
              <li onClick={() => setAboutRoute("basic")} className={`w-full px-5 py-3 cursor-pointer hover:bg-blue-500 hover:text-white ${aboutRoute == "basic" ? "bg-blue-500 text-white" : ""}`}>
                Basic Info
              </li>
              <li onClick={() => setAboutRoute("interest")} className={`w-full px-5 py-3 cursor-pointer hover:bg-blue-500 hover:text-white ${aboutRoute == "interest" ? "bg-blue-500 text-white" : ""}`}>
                Interest
              </li>
              <li onClick={() => setAboutRoute("lang")} className={`w-full px-5 py-3 cursor-pointer hover:bg-blue-500 hover:text-white ${aboutRoute == "lang" ? "bg-blue-500 text-white" : ""}`}>
                Language
              </li>
            </ul>
          </div>
          <div className="w-full md:w-2/3 bg-slate-100">
            {
              aboutRoute == "basic" ? <BasicInfo profileCover={profileCover} /> : aboutRoute == "interest" ? <Interset profileCover={profileCover} /> : aboutRoute == "lang" && <Language profileCover={profileCover} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
