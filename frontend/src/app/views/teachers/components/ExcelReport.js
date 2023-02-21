import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import AppContext from "app/appContext";
import { format } from "date-fns";
const ExcelReport = ({ classroomSlot, classrooms }) => {
  return (
    <div>
      {classroomSlot && (
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <div className="card h-100 w-100">
            <div className="card-body">
              <div className="ul-widget-body">
                <div className="ul-widget3">
                  <div className="ul-widget6__item--table">
                    <table className="table " id="table-xls">
                      <thead>
                        <tr>
                          <th scope="col">Room Name</th>
                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Course</th>
                          <th scope="col">Year Level</th>
                          <th scope="col">Days</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classroomSlot.map((slot) => (
                          <tr>
                            <td>
                              {classrooms.find(
                                (classroom) => classroom.id === slot.resourceId
                              ) &&
                                classrooms.find(
                                  (classroom) =>
                                    classroom.id === slot.resourceId
                                ).title}
                            </td>
                            <td>
                              {format(
                                new Date(0, 0, 0, slot.startTime),
                                "h:mm aa"
                              )}
                            </td>
                            <td>
                              {format(
                                new Date(0, 0, 0, slot.endTime),
                                "h:mm aa"
                              )}
                            </td>
                            <td>{slot.subject.label}</td>
                            <td>{slot.course.label}</td>
                            <td>{slot.yearLevel.label}</td>
                            <td>
                              {slot.days.map((day, idx) => (
                                <span key={idx}>{day}, </span>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      )}
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="btn btn-primary px-3 py-1"
        table="table-xls"
        filename="table_data"
        sheet="table_data"
        buttonText="Download"
      />
    </div>
  );
};

export default ExcelReport;
