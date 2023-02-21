import { authRoles } from "./auth/authRoles";
export const navigations = [
  {
    name: "Dashboard",
    type: "link",
    icon: "i-Bar-Chart",
    path: "/dashboard",
    auth: authRoles.admin,
  },
  {
    name: "Student Records",
    type: "link",
    icon: "i-Student-Hat-2",
    auth: authRoles.admin,
    path: "/students/studentslist",
  },
  {
    name: "Teacher Records",
    type: "link",
    icon: "i-Administrator",
    auth: authRoles.admin,
    path: "/teachers/teachersList",
  },
  {
    name: "Course Records",
    type: "link",
    icon: "i-Management",
    auth: authRoles.admin,
    path: "/courses/courses-list",
  },
  {
    name: "Subject Records",
    type: "link",
    icon: "i-Book",
    path: "/subjects/subjects-list",
    auth: authRoles.admin,
  },
  {
    name: "Classroom Schedules",
    type: "link",
    icon: "i-University1",
    path: "/classrooms/schedule",
    auth: authRoles.teacher,
  },
  {
    name: "My Classes",
    type: "link",
    icon: "i-Newspaper",
    path: "/classrooms/my-classes/",
    auth: authRoles.teacher,
  },
  {
    name: "Approvals",
    type: "dropDown",
    icon: "i-Letter-Open",
    auth: authRoles.admin,
    sub: [
      {
        name: "Classroom Schedule",
        path: "/classrooms/application-slot-list",
        type: "link",
      },
      {
        name: "Close Schedule",
        path: "/classrooms/close-schedule-list",
        type: "link",
      },
      {
        name: "Swap Schedule",
        path: "/classrooms/swap-schedule-list",
        type: "link",
      },
    ],
  },
  {
    name: "Requests",
    type: "dropDown",
    icon: "i-Pen-2",
    auth: authRoles.teacher,
    sub: [
      {
        name: "Close Schedule Request",
        path: "/requests/close-schedule-list",
        type: "link",
      },
      {
        name: "Swap Schedule Request",
        path: "/requests/swap-schedule-list",
        type: "link",
      },
    ],
  },
  {
    name: "Manage Classrooms",
    type: "link",
    icon: "i-Gear-2",
    auth: authRoles.admin,
    path: "/manage/list",
  },
  {
    name: "Classroom Timeslot Records",
    type: "link",
    icon: "i-Clock",
    path: "/masterClass/list",
    auth: authRoles.admin,
  },
  {
    name: "User Records",
    type: "link",
    icon: "i-Administrator",
    path: "/user/users-list",
    auth: authRoles.admin,
  },
];
