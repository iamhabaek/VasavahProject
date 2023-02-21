import React, { useContext, useState } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container } from "react-bootstrap";
import { useHistory, useParams, Link } from "react-router-dom";
import { Breadcrumb } from "@gull";
import { deleteAssign } from "app/reducers/actions/ClassroomActions";
import { nanoid } from "nanoid";
const ViewAssignedStudents = () => {
  const [search, setSearch] = useState("");
  const { students, classrooms, user, classroomSlots, dispatch, token } =
    useContext(AppContext);
  const history = useHistory();
  const { id } = useParams();
  // instance of classroomslot
  const classroomSlot = classroomSlots.find((slot) => slot.id === id) || [];
  const studentsId = classroomSlot.studentsId;
  const studentsList =
    studentsId &&
    students.filter((student) => {
      return studentsId.find((id) => {
        return student.id === id;
      });
    });
  const handleDelete = async (student) => {
    const filterStudentsId = classroomSlot.studentsId.filter(
      (studentId) => studentId != student
    );
    const notifications = {
      id: nanoid(),
      created: Date.now(),
      user: user.email,
      isViewed: false,
      action: "delete",
      content: {
        name: "assign",
        location: "assign",
        description: "student click to see more information",
      },
    };
    // action for delete assigned students
    deleteAssign(id, filterStudentsId, notifications, token)(dispatch);
  };
  console.log(studentsList);
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
                <Link to={`/classrooms/assignStudents/${id}`}>
                  <Button>
                    {" "}
                    <i className="nav-icon i-Add"></i> Assign Student
                  </Button>
                </Link>
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
              {classroomSlot && classrooms && studentsList && (
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
              )}
            </table>
          </div>
        </div>
        {classroomSlot && studentsId && studentsId.length === 0 && (
          <div className="mx-auto p-3 pb-0 mb-5">
            <p className="text-center text-muted">No assigned students</p>
          </div>
        )}
      </Col>
    </Container>
  );
};

export default ViewAssignedStudents;
