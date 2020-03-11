import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    allDay: false,
    end: new Date('March 01, 2020 20:00:00'),
    start: new Date('March 31, 2020 06:00:00'),
    title: 'hi',
  }
]
const MyCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)

export default MyCalendar;