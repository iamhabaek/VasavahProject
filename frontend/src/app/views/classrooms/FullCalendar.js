import React, { useState, useRef, useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import "react-datepicker/dist/react-datepicker.css";
import { Suspense } from "react";
import { Loading } from "@gull";
import ScheduleInfo from "./components/ScheduleInfo";

const CalendarSchedule = ({
  calendarEvents,
  classrooms,
  teachers,
  date,
  token,
  dispatch,
  cancelSchedule,
  user,
}) => {
  const [eventData, setEventData] = useState({});
  const [showScheduleInfo, setShowScheduleInfo] = useState(false);
  const fullCalendarRef = useRef(null);

  useEffect(() => {
    if (fullCalendarRef.current) {
      fullCalendarRef.current.calendar.gotoDate(date);
    }
  }, [date]);

  const handleCloseScheduleModal = () => {
    setShowScheduleInfo(false);
  };
  const handleCancelSchedule = async (id, token, dispatch) => {
    await cancelSchedule(id, token, dispatch);
    setShowScheduleInfo(false);
  };
  const handleEventClick = (info) => {
    setEventData(info.event.extendedProps.scheduleInformation);
    setShowScheduleInfo(true);
  };

  return (
    <div className="demo-app">
      {teachers && calendarEvents && (
        <div className="container">
          <div className="demo-app-main">
            <FullCalendar
              schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
              ref={fullCalendarRef}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                resourceTimelinePlugin,
              ]}
              headerToolbar={{
                left: "prev next today",
                center: "title",
                right: "timeGridDay,timeGridWeek,dayGridMonth",
              }}
              themeSystem="bootstrap"
              allDaySlot={false}
              slotEventOverlap={false}
              eventDisplay="list-item"
              slotMinTime="07:00:00"
              slotMaxTime="21:00:00"
              slotDuration={"1:00:00"}
              dayHeaders={true}
              events={calendarEvents}
              resourceAreaWidth={80}
              resourceAreaHeaderContent="Rooms"
              initialView="dayGridMonth"
              resources={classrooms}
              selectMirror
              dayMaxEvents={false}
              eventClick={handleEventClick}
              buttonText={{
                today: "Today",
                month: "Month",
                week: "Week",
                day: "Day",
              }}
            />
          </div>

          <Suspense fallback={<Loading></Loading>}>
            {showScheduleInfo && (
              <ScheduleInfo
                handleCloseScheduleModal={handleCloseScheduleModal}
                showScheduleInfo={showScheduleInfo}
                data={eventData}
                teachers={teachers}
                token={token}
                dispatch={dispatch}
                cancelSchedule={handleCancelSchedule}
                user={user}
              />
            )}
          </Suspense>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default CalendarSchedule;
