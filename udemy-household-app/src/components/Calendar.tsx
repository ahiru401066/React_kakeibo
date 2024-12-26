import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { DatesSetArg, EventContentArg } from '@fullcalendar/core/index.js';
import "../calendar.css";
import { Balance, CalendarContent, Transaction } from '../types';
import { calculateDailyBalances } from '../utils/financeCalculations';
import { formatCurrency } from '../utils/formatting';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

interface CalenderProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth:  React.Dispatch<React.SetStateAction<Date>>,
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>,
}

const Calendar = ({monthlyTransactions, setCurrentMonth, setCurrentDay}: CalenderProps) => {

  const dailyBalances = calculateDailyBalances(monthlyTransactions)
  console.log("dailyBalance",dailyBalances);

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

  const handleDateSet = (datesetInfo:DatesSetArg) => {
    console.log(datesetInfo);
    setCurrentMonth(datesetInfo.view.currentStart);
    console.log("current month",datesetInfo.view.currentStart);
  }

  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  }

  return (
    <FullCalendar 
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={calendarEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  )
}

export default Calendar