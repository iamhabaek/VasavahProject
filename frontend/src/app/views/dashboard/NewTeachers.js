import React from "react";
import { Dropdown } from "react-bootstrap";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
const NewTeachers = ({ teachers }) => {
  const filteredTeachers = teachers.filter(
    (teacher) =>
      format(teacher.created, "MM/dd/yyyy") === format(Date.now(), "MM/dd/yyyy")
  );
  const history = useHistory();
  const handleAdd = () => {
    history.push("/teachers/add-teacher");
  };
  const handleView = () => {
    history.push("/teachers/teachersList");
  };
  return (
    <div className="row">
      {teachers && filteredTeachers && (
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-header card-title mb-0 d-flex align-items-center justify-content-between border-0">
              <h3 className="w-50 float-left card-title m-0">New Teachers</h3>
              <Dropdown alignRight>
                <Dropdown.Toggle
                  as="span"
                  className="toggle-hidden cursor-pointer"
                >
                  <i className="nav-icon i-Gear-2"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleAdd}>
                    Add new teacher
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleView}>
                    View all teachers
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
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((teacher, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{teacher.teacherName}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.phone}</td>
                        <td>{teacher.gender}</td>
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

export default NewTeachers;
