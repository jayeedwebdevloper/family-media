'use client'
import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import './Event.css'

type PropsType = {
    events: any;
};

export default function EventsPage({ events }: PropsType) {
 

    return (
        <div className='container mx-auto px-4 capitalize'>
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
            />
        </div>
    );
}
