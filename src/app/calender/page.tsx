
import EventsPage from '@/components/EventControl/Events'
import React from 'react'

export default function CalenderPage() {
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
    title: 'This is another event'
  }, {
    id: 3,
    color: '#3694DF',
    date: "2024-07-09",
    title: 'This is also another event'
  }];
  return (
      <div className='mt-20'>
          <EventsPage events={events} />
    </div>
  )
}
