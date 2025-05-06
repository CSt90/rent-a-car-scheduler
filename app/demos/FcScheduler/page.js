'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs'; // Optional, for easy date formatting

const SchedulerPage = () => {
  const resources = [
    { id: 'r1', title: 'Renault Clio, ΡΕΖ 9823' },
    { id: 'r2', title: 'Peugeot 306, ΗΚX 8634' },
    { id: 'r5', title: 'Citroen C4, ΖΝΗ 3376' },
    { id: 'r6', title: 'Mazda 2, ΡΕΜ 5826' },
    { id: 'r3', title: 'Suzuki Alto, ΡΕΖ 9999' },
    { id: 'r4', title: 'Suzuki Swift, ΧΝΖ 1657' },
    { id: 'r7', title: 'Toyota Yaris, ΧΝΚ 7749' },
    { id: 'r8', title: 'Toyota Aygo, ΙΒΟ 1897' },
  ];

  const events = [
    {
        id: '1',
        resourceId: 'r1',
        title: 'ΗΡΑΚΛΕΙΟ',
        start: '2025-05-07T09:30:00',  // Upcoming event
        end: '2025-05-07T15:30:00',
        color: '#488FAB',
      },
      {
        id: '2',
        resourceId: 'r2',
        title: 'ΗΡΑΚΛΕΙΟ',
        start: '2025-05-08T10:00:00',  // Upcoming event
        end: '2025-05-08T16:30:00',
        color: "#488FAB"
      },
      {
        id: '3',
        resourceId: 'r3',
        title: 'ΣΥΝΕΡΓΕΙΟ',
        start: '2025-05-06T08:00:00',  // Upcoming event
        end: '2025-05-06T11:00:00',
        color: "C70039"
      },
      {
        id: '4',
        resourceId: 'r1',
        title: 'ΚΑΘΑΡΙΣΤΗΡΙΟ',
        start: '2025-05-07T17:00:00',  // Upcoming event
        end: '2025-05-07T18:30:00',
        color: '#3788d8',
      },
      {
        id: '5',
        resourceId: 'r2',
        title: 'ΡΕΘΥΜΝΟ',
        start: '2025-05-08T18:00:00',  // Future recurring event
        end: '2025-05-09T17:00:00',
        color: '#DCC36B',
      },
      {
        id: '6',
        resourceId: 'r3',
        title: 'ΧΑΝΙΑ',
        start: '2025-05-07T11:00:00',  // Mid May event
        end: '2025-05-14T19:45:00',
        color: '#FF5733',
      },
      {
        id: '7',
        resourceId: 'r4',
        title: 'ΧΑΝΙΑ',
        start: '2025-05-07T11:00:00',  // Mid May event
        end: '2025-05-14T19:30:00',
        color: '#FF5733',
      },
      {
        id: '8',
        resourceId: 'r6',
        title: 'ΠΑΛΑΙΟΧΩΡΑ',
        start: '2025-05-08T08:30:00',  // Future event
        end: '2025-05-15T10:00:00',
        color: '#C70039',
      },    
      {
        id: '10',
        resourceId: 'r8',
        title: "ΚΟΥΝΟΥΠΙΔΙΑΝΑ",
        start: "2025-05-09T08:15:00",
        end: "2025-05-13T17:15:00",
        color: '#DCC399',
      },
      {
        id: '11',
        resourceId: 'r2',
        title: "ΣΗΤΕΙΑ",
        start: "2025-05-10T14:30:00",
        end: "2025-05-12T12:30:00",
        color: '#DAC3C9',
      },
      {
        id: '12',
        resourceId: 'r9',
        title: "ΚΟΥΝΟΥΠΙΔΙΑΝΑ",
        start: "2025-05-09T10:40:00",
        end: "2025-05-13T20:30:00",
        color: '#DCC399',
      },
      {
        id: '13',
        resourceId: 'r8',
        title: "ΧΑΝΙΑ",
        start: "2025-05-07T08:00:00",
        end: "2025-05-08T20:30:00",
        color: '#FF5733',
      },
      {
        id: '14',
        resourceId: 'r7',
        title: "ΗΡΑΚΛΕΙΟ",
        start: "2025-05-08T10:00:00",
        end: "2025-05-15T16:45:00",
        color: '#488FAB',
      },
      {
        id: '15',
        resourceId: 'r5',
        title: "ΜΑΤΑΛΑ",
        start: "2025-05-05T13:30:00",
        end: "2025-05-10T18:00:00",
        color: '#DC836B',
      },
      {
        id: '16',
        resourceId: 'r5',
        title: "ΑΝΩΓΕΙΑ",
        start: "2025-05-11T09:00:00",
        end: "2025-05-14T20:20:00",
        color: '#581845',
      },
      {
        id: '17',
        resourceId: 'r5',
        title: "ΡΕΘΥΜΝΟ",
        start: "2025-05-01T09:30:00",
        end: "2025-05-04T17:50:00",
        color: '#DCC36B',
      },
      {
        id: '18',
        resourceId: 'r17',
        title: 'ΗΡΑΚΛΕΙΟ',
        start: '2025-05-09T09:00:00',  // Future event
        end: '2025-05-09T11:00:00',
        color: '#488FAB',
      },
      {
        id: '19',
        resourceId: 'r9',
        title: "ΠΛΥΝΤΗΡΙΟ",
        start: "2025-05-14T09:30:00",
        end: "2025-05-14T11:00:00",
        color: '#3788d8',
      },
  ];

    // Custom event content function to display title, start, and end times
    const eventContent = (eventInfo) => {
        const { title, start, end } = eventInfo.event;
        const startTime = start.toLocaleString(); // Format start time
        const endTime = end.toLocaleString();     // Format end time

        return {
            html: `
            <div style="background-color: ${eventInfo.event.backgroundColor}; padding: 5px; border-radius: 3px;">
                <strong>${title}</strong> <br/>
                <span>${startTime} - ${endTime}</span>
            </div>
            `,
        };
    };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineWeek"
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source" 
        timeZone="local"
        locale="el-GR"
        slotMinTime="07:00:00"
        slotMaxTime="22:00:00"
        editable={true}
        selectable={true}
        resourceAreaHeaderContent="ΣΤΟΛΟΣ"
        resources={resources}
        events={events}
        eventContent={eventContent}
        slotDuration = '03:00:00'
        eventTimeFormat= {{ // like '14:30:00'
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false
          }}
        headerToolbar={{
          left: 'today prev,next',
          center: 'title',
          right: 'resourceTimelineDay,resourceTimelineWeek',
        }}
        eventClick={(info) => {
          alert(`Clicked event: ${info.event.title}`);
        }}
        select={(info) => {
          console.log('Selected time range:', info.startStr, '→', info.endStr);
        }}
        height="auto"
      />
    </div>
  );
};

export default SchedulerPage;