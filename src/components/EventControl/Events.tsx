'use client'
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import './Event.css'

type PropsType = {
    events: any;
};

export default function EventsPage({ events }: PropsType) {

    const [eventDetails, setEventDetails] = useState<any>({});
    const [isOpen, setIsOpen] = useState(false);

    const detailsShow = (info: any) => {
        const desc = info.event.extendedProps.desc;
        const title = info.event.title;
        const data = {
            desc, title
        }
        setEventDetails(data);
        setIsOpen(true);
    }


    return (
        <div className='container mx-auto px-4 capitalize'>
            <div className="w-full relative">
                <div className={`fixed transition-all duration-500 z-[110] left-0 right-0 top-0 bg-black/50 h-screen w-full flex items-center justify-center ${isOpen ? "visible scale-100" : "invisible scale-0"}`}>
                    <div className="bg-white w-[85%] h-[75%] rounded-md shadow-md px-3 py-2 flex justify-between flex-col">
                        <div className='overflow-x-hidden overflow-y-scroll'>
                            <h1 className='text-xl font-semibold pb-2'>{eventDetails?.title}</h1>
                            <p>{eventDetails?.desc}</p>
                        </div>

                        <button onClick={() => {
                            setEventDetails({});
                            setIsOpen(false)
                        }} className='bg-slate-500 text-white px-3 py-1 rounded-md transition-all duration-400 hover:bg-slate-700 mt-auto block'>Close</button>
                    </div>
                </div>
            </div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridYear,dayGridDay'
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                initialView="dayGridMonth"
                weekends={false}
                events={events}
                eventClick={detailsShow}
            />
        </div>
    );
}
