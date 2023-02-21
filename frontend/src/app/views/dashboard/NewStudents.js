import React from "react";
import { format } from "date-fns/";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const NewStudents = ({ students }) => {
  const history = useHistory();
  const filteredStudents = students.filter(
    (student) =>
      format(student.created, "MM/dd/yyyy") === format(Date.now(), "MM/dd/yyyy")
  );

  const handleAdd = () => {
    history.push("/students/add-student");
  };
  const handleView = () => {
    history.push("/students/studentslist");
  };
  return (
    <div className="row">
      {students && filteredStudents && (
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-header card-title mb-0 d-flex align-items-center justify-content-between border-0">
              <h3 className="w-50 float-left card-title m-0">New Students</h3>
              <Dropdown alignRight>
                <Dropdown.Toggle
                  as="span"
                  className="toggle-hidden cursor-pointer"
                >
                  <i className="nav-icon i-Gear-2"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleAdd}>
                    Add new student
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleView}>
                    View all students
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="">
              <div className="table-responsive">
                <table id="user_table" className="table  text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>{student.gender}</td>
                        <td>
                          {" "}
                          <span
                            className={`badge badge-pill ${
                              student.status === "Regular"
                                ? "badge-success"
                                : "badge-danger"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewStudents;
