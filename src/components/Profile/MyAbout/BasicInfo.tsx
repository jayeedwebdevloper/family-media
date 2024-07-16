import React from 'react';

type PropsType = {
    profileCover: any
}

export default function BasicInfo(props: PropsType) {
    const { profileCover } = props;
  return (
      <div className='py-2 px-3'>
          {
              profileCover.map((data: any, i: number) => (
                  <div key={i}>
                      <div className="flex items-center gap-3 pb-3">
                          <img className='size-4' src="/icons/profile.svg" alt="family" />
                          <h4 className='text-sm'>{data?.displayName}</h4>
                      </div>
                      <div className="flex items-center gap-3 pb-3">
                          <img className='size-4' src="/icons/location.svg" alt="family" />
                          <h4 className='text-sm'>{data?.about.location}</h4>
                      </div>
                      <div className="flex items-center gap-3 pb-3">
                          <img className='size-4' src="/icons/phone.svg" alt="family" />
                          <h4 className='text-sm'>{data?.about.phoneNumber}</h4>
                      </div>
                      <div className="flex items-center gap-3 pb-3">
                          <img className='size-4' src="/icons/mail.svg" alt="family" />
                          <h4 className='text-sm'>example@gmamil.com</h4>
                      </div>
                      <div className="flex items-center gap-3 pb-0">
                          <img className='size-4' src="/icons/world.svg" alt="family" />
                          <h4 className='text-sm'>{data?.about.website}</h4>
                      </div>
                  </div>
              ))
          }
    </div>
  )
}
