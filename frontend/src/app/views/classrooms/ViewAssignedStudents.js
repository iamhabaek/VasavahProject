import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container, Dropdown } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { Breadcrumb } from "@gull";
import Swal from "sweetalert2";
import api from "app/api/api";
import { deleteAssign } from "app/reducers/actions/ClassroomActions";
const ViewAssignedStudents = () => {
  const [search, setSearch] = useState("");
  const { students, classrooms, classroomSlots, dispatch } =
    useContext(AppContext);
  const history = useHistory();
  const { id } = useParams();
  const classroomSlot = classroomSlots.find((slot) => slot.id === id) || [];
  const studentsId = classroomSlot.studentsId;
  const studentsList = students.filter((student) => {
    return studentsId.find((id) => {
      return student.id === id;
    });
  });
  const handleDelete = async (student) => {
    const filterStudentsId = classroomSlot.studentsId.filter(
      (studentId) => studentId != student
    );
    deleteAssign(id, filterStudentsId)(dispatch);
  };

  return (
    <Container>
      <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
        <Breadcrumb
          routeSegments={[
            { name: "Home", path: "/" },
            { name: "Assigned Students List" },
          ]}
        />
        <div className="card border-0 ">
          <div className="card-body">
            <div className="ul-widget__head border-0 mb-2">
              <div className="ul-widget__head-label">
                <h1></h1>
              </div>
              <form alignRight>
                <input
                  className="form-control "
                  type="search"
                  placeholder="Search Here...."
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </form>
            </div>
            <div className="ul-widget-body">
              <div className="ul-widget3">
                <div className="ul-widget6__item--table">
                  <table className="table">
                    <thead>
                      <tr className="">
                        <th className="nowrap-th border-0 " scope="col">
                          Name
                        </th>
                        <th className="nowrap-th border-0 " scope="col">
                          Course
                        </th>
                        <th className="nowrap-th border-0 " scope="col">
                          Year Level
                        </th>
                        <th className="nowrap-th border-0 " scope="col">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {classroomSlot && classrooms && studentsList ? (
                      <tbody>
                        {studentsList
                          .filter((data) =>
                            search === ""
                              ? data
                              : data.name.toLowerCase().includes(search)
                          )
                          .map((data) => (
                            <tr key={data.id}>
                              <td className="border-0 ">
                                <span>{data.name}</span>
                              </td>
                              <td className="border-0 ">
                                <span>{data.course}</span>
                              </td>
                              <td className="border-0 ">
                                <span>{data.yearLevel}</span>
                              </td>
                              <td className="border-0 ">
                                <Button
                                  onClick={() => handleDelete(data.id)}
                                  variant="danger"
                                  className="text-12 py-1 px-2"
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    ) : (
                      <h1 className="text-center"> No Data Found</h1>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Container>
  );
};

export default ViewAssignedStudents;
