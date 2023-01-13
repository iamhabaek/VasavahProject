export const navigations = [
  {
    name: "Students",
    type: "dropDown",
    icon: "i-Student-Hat-2",
    sub: [
      {
        icon: "i-Add-User",
        name: "Add Student",
        path: "/students/add-student",
        type: "link",
      },
      {
        icon: "i-Eye",
        name: "View Students",
        path: "/students/studentslist",
        type: "link",
      },
    ],
  },
  {
    name: "Teachers",
    type: "dropDown",
    icon: "i-Administrator",
    sub: [
      {
        icon: "i-Add-User",
        name: "Add Teacher",
        path: "/teachers/add-teacher",
        type: "link",
      },
      {
        icon: "i-Eye",
        name: "View Teachers",
        path: "/teachers/teachersList",
        type: "link",
      },
    ],
  },
  {
    name: "Courses",
    type: "dropDown",
    icon: "i-Management",
    sub: [
      {
        icon: "i-Add-User",
        name: "Add Course",
        path: "/courses/add-course",
        type: "link",
      },
      {
        icon: "i-Eye",
        name: "View Courses",
        path: "/courses/courses-list",
        type: "link",
      },
    ],
  },
  {
    name: "Subjects",
    type: "dropDown",
    icon: "i-Book",
    sub: [
      {
        icon: "i-Add-User",
        name: "Add Subject",
        path: "/subjects/add-subject",
        type: "link",
      },
      {
        icon: "i-Eye",
        name: "View Subject",
        path: "/subjects/subjects-list",
        type: "link",
      },
    ],
  },
  {
    name: "Classrooms",
    type: "dropDown",
    icon: "i-University1",
    sub: [
      {
        icon: "i-Add-User",
        name: "Assign Students & Generate Reports ",
        path: "/classrooms/classrooms-assign",
        type: "link",
      },
      {
        icon: "i-Eye",
        name: "View Classrooms",
        path: "/classrooms/classrooms-list",
        type: "link",
      },
    ],
  },
  {
    name: "Master Class",
    type: "dropDown",
    icon: "i-Bar-Chart",
    sub: [
      {
        icon: "i-Eye",
        name: "View Occupied List",
        path: "/masterClass/list",
        type: "link",
      },
    ],
  },
];
