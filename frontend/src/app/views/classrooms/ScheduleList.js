import React, { useState, useContext, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AppContext from "app/appContext";
import { Suspense } from "react";
import { Loading } from "@gull";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import CalendarSchedule from "./FullCalendar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Breadcrumb } from "@gull";
import ScheduleListView from "./ScheduleListView";
import CreateSlot from "./components/CreateSlot";
import RoomsList from "./components/RoomsList";
import { getClassroomSlotList } from "app/reducers/actions/ClassroomActions";
import { cancelSlot } from "app/reducers/actions/ClassroomActions";
const ScheduleList = () => {
  const {
    classrooms,
    courses,
    teachers,
    user,
    token,
    dispatch,
    classroomSlots,
    subjects,
  } = useContext(AppContext);
  const [selectedRoom, setSelectedRoom] = useState();
  const [showCreateSlot, setShowCreateSlot] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [calendarEvents, setCalendarEvents] = useState();
  const [listSlots, setListSlots] = useState();
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState();
  const history = useHistory();
  useEffect(() => {
    if (user) {
      if (user.role === "_admin") {
        setSelectedFilter("rooms");
        setCalendarEvents(generateEvents(classroomSlots));
        setListSlots(classroomSlots);
      }
      if (user.role === "_teacher") {
        setSelectedFilter("schedule");
        const filtered = classroomSlots.filter(
          (slot) => slot.teacher === user.uid
        );
        setCalendarEvents(generateEvents(filtered));
        setListSlots(filtered);
      }
    }
  }, [user, classroomSlots]);

  const [cardView, setCardView] = useState(true);
  const [listView, setListView] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCardView = () => {
    setListView(false);
    setCardView(true);
  };
  const handleShowCreateSlot = () => {
    setShowCreateSlot(false);
  };
  const cancelSchedule = async (id, token, dispatch) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await cancelSlot(id, token)(dispatch);
          Swal.fire("Cancelled!", "Slot has been cancelled.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
    history.push("/classrooms/schedule");
  };
  const handleApplySlotForm = () => {
    setShowCreateSlot(true);
    getClassroomSlotList(token)(dispatch);
  };
  const handleListView = () => {
    setCardView(false);
    setListView(true);
  };
  const formatTimestamp = (timestamp) => {
    return dayjs(timestamp).format("YYYY-MM-DD");
  };
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };
  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };
  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleCalendarChange = (selectedDate, event) => {
    setDate(selectedDate);
  };
  const handleFilter = (filterBy) => {
    setLoading(true);
    setTimeout(() => {
      if (filterBy === "rooms") {
        const filtered = classroomSlots.filter(
          (slot) => slot.resourceId === selectedRoom
        );
        setCalendarEvents(generateEvents(filtered));
        setListSlots(filtered);
      }
      if (filterBy === "schedule") {
        const filtered = classroomSlots.filter(
          (slot) => slot.teacher === user.uid
        );
        setCalendarEvents(generateEvents(filtered));
        setListSlots(filtered);
      }
      if (filterBy === "teachers") {
        const filtered = classroomSlots.filter(
          (slot) => slot.teacher === selectedTeacher
        );
        setCalendarEvents(generateEvents(filtered));
        setListSlots(filtered);
      }
      if (filterBy === "subjects") {
        const filtered = classroomSlots.filter(
          (slot) => slot.subject.value === selectedSubject
        );
        setCalendarEvents(generateEvents(filtered));
        setListSlots(filtered);
      }
      setLoading(false);
    }, 2000);
  };
  function generateEvents(filteredData) {
    let events = [];
    filteredData.forEach((item) => {
      let start = dayjs(formatTimestamp(item.startDate));
      let end = dayjs(formatTimestamp(item.endDate));
      for (
        let currentDate = start;
        currentDate <= end;
        currentDate = dayjs(currentDate).add(1, "day")
      ) {
        let dayOfWeek = dayjs(currentDate).format("dddd");
        if (item.days.includes(dayOfWeek)) {
          events.push({
            id: item.id,
            title: `${item.subject.label} - ${
              teachers.find((teacher) => teacher.id === item.teacher)
                ? teachers.find((teacher) => teacher.id === item.teacher)
                    .teacherName
                : "-"
            }`,
            start: currentDate
              .add(item.startTime, "hour")
              .format("YYYY-MM-DDTHH:mm:ssZ"),
            end: currentDate
              .add(item.endTime, "hour")
              .format("YYYY-MM-DDTHH:mm:ssZ"),
            resourceId: item.resourceId,
            scheduleInformation: {
              id: item.id,
              startTime: format(new Date(0, 0, 0, item.startTime), "h:mm aa"),
              endTime: format(new Date(0, 0, 0, item.endTime), "h:mm aa"),
              subject: item.subject,
              course: item.course,
              yearLevel: item.yearLevel,
              days: item.days,
              isApproved: item.isApproved,
              teacher: item.teacher,
              resourceId: item.resourceId,
            },
          });
        }
      }
    });
    return events;
  }
  const quickFilter = (id) => {
    setLoading(true);
    setTimeout(() => {
      const filtered = classroomSlots.filter((slot) => slot.resourceId === id);
      setCalendarEvents(generateEvents(filtered));
      setListSlots(filtered);
      setLoading(false);
    }, 2000);
  };
  return (
    <div>
      {user && classrooms && classroomSlots && calendarEvents && (
        <div>
          <Breadcrumb routeSegments={[{ name: "Classroom Schedules" }]} />
          <div className="row">
            <div className="col-md-7">
              <div className="form-group">
                <button onClick={handleApplySlotForm} className="btn btn-info">
                  <i className="i-Pen-2"></i> Apply for Schedule
                </button>
              </div>
            </div>
            <div className="col-md-5">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Filter By:</span>
                </div>
                {user && user.role === "_admin" && (
                  <select
                    className="custom-select"
                    name="filter"
                    defaultValue="rooms"
                    onChange={handleFilterChange}
                  >
                    <option value="rooms">Rooms</option>
                    <option value="teachers">Teachers</option>
                    <option value="subjects">Subjects</option>
                    <option value="schedule">Applied Schedule</option>
                  </select>
                )}
                {user && user.role === "_teacher" && (
                  <select
                    className="custom-select"
                    name="filter"
                    defaultValue="schedule"
                    onChange={handleFilterChange}
                  >
                    <option value="schedule">Applied Schedule</option>
                    <option value="rooms">Rooms</option>
                  </select>
                )}
                {selectedFilter === "rooms" && (
                  <select
                    name="rooms"
                    id="rooms"
                    value={selectedRoom}
                    className="custom-select"
                    onChange={handleRoomChange}
                  >
                    <option defaultValue="">Select</option>
                    {classrooms.map((classroom) => (
                      <option key={classroom.id} value={classroom.id}>
                        {classroom.title}
                      </option>
                    ))}
                  </select>
                )}
                {selectedFilter === "teachers" &&
                  user &&
                  user.role === "_admin" && (
                    <select
                      name="teachers"
                      id="teachers"
                      className="custom-select"
                      value={selectedTeacher}
                      defaultValue={selectedTeacher}
                      onChange={handleTeacherChange}
                    >
                      <option value="">Select</option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.teacherName}
                        </option>
                      ))}
                    </select>
                  )}
                {selectedFilter === "subjects" &&
                  user &&
                  user.role === "_admin" && (
                    <select
                      name="subjects"
                      id="subjects"
                      defaultValue={selectedSubject}
                      value={selectedSubject}
                      className="custom-select"
                      onChange={handleSubjectChange}
                    >
                      <option value="">Select</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.subjectName}
                        </option>
                      ))}
                    </select>
                  )}
                <div className="input-group-append">
                  <button
                    disabled={
                      !selectedRoom && !selectedTeacher && !selectedSubject
                    }
                    onClick={() => handleFilter(selectedFilter)}
                    className="btn btn-primary"
                    type="button"
                  >
                    <i className="i-Magnifi-Glass1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-end align-items-center mt-4">
            <div className="text-left form-group">
              <label className="text-dark">View By: </label>
              <div className="btn-group ml-1">
                <button
                  title="ListView"
                  onClick={handleListView}
                  className={
                    listView
                      ? "btn btn-primary btn-sm"
                      : "btn btn-outline-primary btn-sm"
                  }
                >
                  <i className="i-Newspaper"></i>
                </button>
                <button
                  title="Widgets"
                  onClick={handleCardView}
                  className={
                    cardView
                      ? "btn btn-primary btn-sm"
                      : "btn btn-outline-primary btn-sm"
                  }
                >
                  <i className="i-Split-Four-Square-Window"></i>
                </button>
              </div>
            </div>
          </div>
          {!loading && (
            <div>
              <div>
                {cardView && (
                  <div>
                    {calendarEvents && (
                      <div className="row">
                        <div className="col-lg-3 mt-5">
                          <Suspense fallback={<Loading></Loading>}>
                            <Calendar
                              onChange={handleCalendarChange}
                              value={date}
                              cancelSchedule={cancelSlot}
                            />
                          </Suspense>

                          <RoomsList
                            quickFilter={quickFilter}
                            classrooms={classrooms}
                          />
                        </div>

                        <div className="col-lg-9">
                          <Suspense fallback={<Loading></Loading>}>
                            <CalendarSchedule
                              calendarEvents={calendarEvents}
                              classrooms={classrooms}
                              teachers={teachers}
                              courses={courses}
                              date={date}
                              cancelSchedule={cancelSchedule}
                              token={token}
                              dispatch={dispatch}
                              user={user}
                            />
                          </Suspense>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                {listView && (
                  <ScheduleListView
                    teachers={teachers}
                    classrooms={classrooms}
                    classroomSlots={listSlots}
                    cancelSchedule={cancelSchedule}
                    token={token}
                    dispatch={dispatch}
                    user={user}
                  />
                )}
              </div>
            </div>
          )}

          <Suspense fallback={<Loading></Loading>}>
            {showCreateSlot && (
              <CreateSlot
                handleShowCreateSlot={handleShowCreateSlot}
                show={showCreateSlot}
                classrooms={classrooms}
                courses={courses}
                teachers={teachers}
                subjects={subjects}
                token={token}
                user={user}
                classroomSlots={classroomSlots}
                dispatch={dispatch}
              />
            )}
          </Suspense>
        </div>
      )}
      {loading && (
        <div className="d-flex flex-row justify-content-center mt-5">
          <div className="loader-bubble loader-bubble-primary"></div>
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
