'use client'
import EventsPage from '@/components/EventControl/Events'
import React, { useState } from 'react';
import { format } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './calender.css'

export default function CalenderPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState<Date>();

  let footer = <p>Please select a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }

  const events = [{
    id: 1,
    color: '#000',
    date: "2024-07-01",
    title: 'This is an event',
    desc: "test"
  }, {
    id: 2,
    color: '#1ccb9e',
    date: "2024-07-01",
    title: 'This is another event',
    desc: "test2"
  }, {
    id: 3,
    color: '#3694DF',
    date: "2024-07-09",
    title: 'This is also another event',
    desc: "test3"
  }];


  return (
    <div className='mt-20 relative'>
      <div className="container mx-auto px-3 md:px-6">
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => setIsOpen(true)} className='bg-blue-500 text-sm text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-500 my-3'>Add Event</button>
          <button onClick={() => setIsOpen(true)} className='bg-blue-500 text-sm text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-500 my-3'>Edit An Event</button>
          <button onClick={() => setIsOpen(true)} className='bg-red-500 text-sm text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition-all duration-500 my-3'>Delete An Event</button>
       </div>

        <div className={`fixed h-screen w-full transition-all duration-300 bg-black/50 left-0 top-0 right-0 flex items-center justify-center z-[100] ${isOpen == false ? "invisible scale-0" : "visible scale-100"}`}>
          <form className='bg-white w-11/12 block md:w-[450px] shadow rounded-md px-3 py-2 h-[75%] overflow-x-hidden overflow-y-scroll'>
            <div className="flex justify-between">
              <p className='font-semibold text-xl'>Add Event</p>
              <p onClick={() => setIsOpen(false)} className='text-xl cursor-pointer'>⨉</p>
            </div>

            <div className="py-1">
              <label htmlFor="title" className='block text-sm pb-1'>
                Title
              </label>
              <input required type="text" id='title' className='w-full text-sm font-normal border-none outline-none ring-1 ring-blue-500/30 rounded-md px-3 py-2' placeholder='Event Title' name='title' />
            </div>
            <div className="py-1">
              <label htmlFor="desc" className='block text-sm pb-1'>
                Description
              </label>
              <textarea required id='desc' className='w-full text-sm font-normal border-none outline-none ring-1 ring-blue-500/30 rounded-md px-3 py-2' placeholder='write here event description' name='desc' />
            </div>
            <div className="py-1">
              <label htmlFor="color" className='block text-sm pb-1'>
                Select Color
              </label>
              <input required type="color" id='color' className='w-full text-sm font-normal border-none outline-none ring-1 ring-blue-500/30 rounded-md px-1' name='color' />
            </div>

            <p className='pt-1 text-sm'>Event Date</p>

            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              required
              footer={footer}
            />

            <button className='w-full bg-blue-500 hover:bg-blue-700 transition-all duration-300 py-2 px-3 text-white rounded-md'>Add</button>
          </form>
        </div>

      </div>
      <EventsPage events={events} />
    </div>
  )
}
