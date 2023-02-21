import React, { useState } from "react";
import Chart from "react-apexcharts";
import SimpleCard from "@gull/components/cards/SimpleCard";
import Select from "react-select";
import {
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  addMinutes,
  startOfHour,
  setMilliseconds,
  format,
} from "date-fns";
const StudentsChart = ({
  students,
  teachers,
  classrooms,
  subjects,
  courses,
  classroomSlots,
}) => {
  const options = [
    { label: "Last 60 minutes", value: "minutes" },
    { label: "Last 24 hours", value: "hours" },
    { label: "Last 7 days", value: "days" },
    { label: "Last 30 days", value: "month" },
  ];
  const optionsData = [
    { label: "Students", value: students },
    { label: "Teachers", value: teachers },
    { label: "Subjects", value: subjects },
    { label: "Courses", value: courses },
    { label: "Classrooms", value: classrooms },
    { label: "Classroom Slots", value: classroomSlots },
  ];
  const [selected, setSelected] = useState(options[0]);
  const [selectData, setSelectData] = useState(optionsData[0]);

  const getData = (select) => {
    if (select.label === "Students") {
      return students;
    }
    if (select.label === "Teachers") {
      return teachers;
    }
    if (select.label === "Subjects") {
      return subjects;
    }
    if (select.label === "Courses") {
      return courses;
    }
    if (select.label === "Classrooms") {
      return classrooms;
    }
    if (select.label === "Classroom Slots") {
      return classroomSlots;
    }
  };
  const getName = (select) => {
    if (select.label === "Students") {
      return "Students";
    }
    if (select.label === "Teachers") {
      return "Teachers";
    }
    if (select.label === "Subjects") {
      return "Subjects";
    }
    if (select.label === "Courses") {
      return "Courses";
    }
    if (select.label === "Classrooms") {
      return "Classrooms";
    }
    if (select.label === "Classroom Slots") {
      return "ClassroomSlots";
    }
  };
  console.log(selectData);
  const handleChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };
  const handleChangeData = (selectedOptions) => {
    setSelectData(selectedOptions);
  };

  const filterBy30Days = (data) =>
    data.filter((item) => {
      const now = Date.now();
      return item.created > now - 30 * 24 * 60 * 60 * 1000;
    });
  const filterByDays = (data) =>
    data.filter((item) => {
      const now = Date.now();
      return item.created > now - 7 * 24 * 60 * 60 * 1000;
    });
  const filterByMinutes = (data) => {
    const filtered = data.filter((item) => {
      const now = Date.now();
      return item.created > now - 60 * 60 * 1000;
    });
    return filtered;
  };

  const getMinutes = () => {
    const interval = 15;
    const currentDate = new Date();
    const sixtyMinutesAgo = addMinutes(currentDate, -60);

    const start = startOfHour(sixtyMinutesAgo);
    const end = startOfHour(currentDate);

    const hoursWithIntervals = [];
    for (let i = start; i <= end; i = addMinutes(i, interval)) {
      hoursWithIntervals.push(format(i, "h:mm a"));
    }
    return hoursWithIntervals;
  };

  const generateTime = (startTime, endTime) => {
    const setTime = (x, h = 0, m = 0, s = 0, ms = 0) =>
      setHours(setMinutes(setSeconds(setMilliseconds(x, ms), s), m), h);
    const from = setTime(new Date(), startTime);
    const to = setTime(new Date(), endTime + 1);
    const step = (x) => addMinutes(x, 60);

    let blocks = [];
    let cursor = from;

    while (isBefore(cursor, to)) {
      blocks.push(format(cursor, "h:mm a"));

      cursor = step(cursor);
    }

    return blocks;
  };

  const filterByHours = (data) =>
    data.filter((item) => {
      const now = Date.now();
      return item.created > now - 24 * 60 * 60 * 1000;
    });
  function groupDataByMinutes(data) {
    let groupedData = {};
    filterByMinutes(data)
      .sort((a, b) => a.created - b.created)
      .forEach((item) => {
        const minutes = format(new Date(item.created), "hh:mm a");
        if (groupedData[minutes]) {
          groupedData[minutes]++;
        } else {
          groupedData[minutes] = 1;
        }
      });

    return Object.entries(groupedData).map(([minutes, count]) => ({
      x: minutes,
      y: count,
    }));
  }
  function groupDataByHours(data) {
    let groupedData = {};
    filterByHours(data)
      .sort((a, b) => a.created - b.created)
      .forEach((item) => {
        const hours = format(new Date(item.created), "hh:00 a");
        if (groupedData[hours]) {
          groupedData[hours]++;
        } else {
          groupedData[hours] = 1;
        }
      });
    return Object.entries(groupedData).map(([hours, count]) => ({
      x: hours,
      y: count,
    }));
  }
  function groupDataByDay(data) {
    let groupedData = {};
    filterByDays(data)
      .sort((a, b) => a.created - b.created)
      .forEach((item) => {
        const day = format(new Date(item.created), "EEEE");
        if (groupedData[day]) {
          groupedData[day]++;
        } else {
          groupedData[day] = 1;
        }
      });
    return Object.entries(groupedData).map(([day, count]) => ({
      x: day,
      y: count,
    }));
  }
  function groupDataByMonth(data) {
    let groupedData = {};
    filterBy30Days(data)
      .sort((a, b) => a.created - b.created)
      .forEach((item) => {
        const day = format(new Date(item.created), "MMM/dd");
        if (groupedData[day]) {
          groupedData[day]++;
        } else {
          groupedData[day] = 1;
        }
      });
    return Object.entries(groupedData).map(([day, count]) => ({
      x: day,
      y: count,
    }));
  }
  const minutesOption = {
    chart: {
      height: 80,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    series: [
      {
        name: getName(selectData),
        data: groupDataByMinutes(getData(selectData)),
      },
    ],

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {},
  };
  const hoursOptions = {
    chart: {
      height: 80,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    series: [
      {
        name: getName(selectData),
        data: groupDataByHours(getData(selectData)),
      },
    ],

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      // categories: getMinutes(),
    },
  };
  const daysOptions = {
    chart: {
      height: 80,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    series: [
      {
        name: getName(selectData),
        data: groupDataByDay(getData(selectData)),
      },
    ],

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      // categories: getMinutes(),
    },
  };
  const monthOptions = {
    chart: {
      height: 80,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    series: [
      {
        name: getName(selectData),
        data: groupDataByMonth(getData(selectData)),
      },
    ],

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      // categories: getMinutes(),
    },
  };
  return (
    <SimpleCard className="mb-4">
      <div className="d-flex flex-row align-items-center">
        <h3 className="mr-2">Numbers of recently added</h3>
        <Select
          className="mr-2"
          options={optionsData}
          onChange={handleChangeData}
          value={selectData}
        />
        <Select
          className="mr-2"
          options={options}
          onChange={handleChange}
          value={selected}
        />
      </div>

      {selected.value === "minutes" && (
        <Chart
          options={minutesOption}
          series={minutesOption.series}
          type={minutesOption.chart.type}
        />
      )}
      {selected.value === "hours" && (
        <Chart
          options={hoursOptions}
          series={hoursOptions.series}
          type={hoursOptions.chart.type}
        />
      )}
      {selected.value === "days" && (
        <Chart
          options={daysOptions}
          series={daysOptions.series}
          type={daysOptions.chart.type}
        />
      )}
      {selected.value === "month" && (
        <Chart
          options={monthOptions}
          series={monthOptions.series}
          type={monthOptions.chart.type}
        />
      )}
    </SimpleCard>
  );
};

export default StudentsChart;
