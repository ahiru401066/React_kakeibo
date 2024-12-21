import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { EventContentArg } from '@fullcalendar/core/index.js';
import "../calendar.css";
import { Transaction } from '../types';
import { calculateDailyBalances } from '../utils/financeCalculations';

interface CalenderProps {
  monthlyTransactions: Transaction[]
}

const Calendar = ({monthlyTransactions}: CalenderProps) => {
  const events = [
    {title: 'Meeting', start:"2024-12-20" },
    {title: 'Meeting', start:"2024-12-21", income: 300, expense: 200, balance: 100 },
  ]

  const dailyBalances = calculateDailyBalances(monthlyTransactions)
  console.log(dailyBalances);


  const renderEventContent = (eventInfo: EventContentArg) => {
    console.log(eventInfo);
    return (
      <div>
        <div className='money' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        
        <div className='money' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>

        <div className='money' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  return (
    <FullCalendar 
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={events}
      eventContent={renderEventContent}
    />
  )
}

export default Calendar