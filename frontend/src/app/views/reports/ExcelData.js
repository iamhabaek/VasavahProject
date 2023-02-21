import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ExcelData = ({
  classroomSlot,
  classrooms,
  teachers,
  subjects,
  students,
}) => {
  const studentsList = students.filter((student) => {
    return (
      classroomSlot &&
      classroomSlot.studentsId.find((studentId) => {
        return student.id === studentId;
      })
    );
  });
  return (
    <div>
      {classroomSlot && classrooms && subjects && (
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <div className="card h-100 w-100">
            <div className="card-body">
              <div className="ul-widget-body">
                <div className="ul-widget3">
                  <div className="ul-widget6__item--table">
                    <table className="table " id="table-xls">
                      <thead>
                        <tr>
                          <th scope="col">Student Name</th>
                          <th scope="col">Address</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Gender</th>
                          <th scope="col">Course</th>
                          <th scope="col">Year Level</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentsList.map((student) => (
                          <tr>
                            <td>{student.name}</td>
                            <td>{student.address}</td>
                            <td>{student.phone}</td>
                            <td>{student.gender}</td>

                            <td> {student.course}</td>
                            <td> {student.yearLevel}</td>
                            <td>{student.status}</td>
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

export default ExcelData;
