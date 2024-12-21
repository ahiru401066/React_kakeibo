import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { EventContentArg } from '@fullcalendar/core/index.js';
import "../calendar.css";
import { Balance, CalendarContent, Transaction } from '../types';
import { calculateDailyBalances } from '../utils/financeCalculations';
import { formatCurrency } from '../utils/formatting';

interface CalenderProps {
  monthlyTransactions: Transaction[]
}

const Calendar = ({monthlyTransactions}: CalenderProps) => {

  const dailyBalances = calculateDailyBalances(monthlyTransactions)
  console.log(dailyBalances);

  // 2. FulCalendar用のイベントを生成する関数
  const createCalendarEvents = (dailyBalances: Record<string,Balance>):CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const {income, expense, balance} = dailyBalances[date]
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      }
    })
  }

  const calendarEvents = createCalendarEvents(dailyBalances);
  console.log(calendarEvents);

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
      events={calendarEvents}
      eventContent={renderEventContent}
    />
  )
}

export default Calendar