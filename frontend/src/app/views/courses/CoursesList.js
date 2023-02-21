import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container, Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { deleteCourse } from "app/reducers/actions/ClassroomActions";
import { Breadcrumb } from "@gull";
import { nanoid } from "nanoid";
const CoursesList = () => {
  // States from context provider
  const { courses, dispatch, user, token } = useContext(AppContext);

  const [search, setSearch] = useState("");

  const history = useHistory();
  // redirect to edit page function
  const handleEdit = (id) => {
    history.push(`/courses/edit/${id}`);
  };
  // delete data function
  const handleDelete = async (id, name) => {
    const notifications = {
      id: nanoid(),
      created: Date.now(),
      user: user.email,
      isViewed: false,
      action: "delete",
      content: {
        name: name,
        location: "course",
        description: "to see more information",
      },
    };
    deleteCourse(id, notifications, token)(dispatch);
  };

  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Course List", path: "/courses/courses-list" },
        ]}
      />
      <Container>
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <div className="card">
            <div className="card-body border-0">
              <div className="ul-widget__head border-0 mb-4">
                <Link to="/courses/add-course">
                  <Button alignRight>
                    {" "}
                    <i className="nav-icon i-Add"></i> Add Course
                  </Button>
                </Link>
                <div className="d-flex flex-row">
                  <form className="mr-5">
                    <input
                      className="form-control "
                      type="search"
                      placeholder="Search Here...."
                      onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                  </form>
                </div>
              </div>

              <table className="table">
                <thead>
                  <tr className="border-0">
                    <th className="text-primary border-0" scope="col">
                      COURSE NAME
                    </th>
                    <th className="text-primary border-0" scope="col">
                      YEARS TO FINISH
                    </th>
                    <th className="text-primary border-0" scope="col">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                {courses && (
                  <tbody>
                    {courses
                      .filter((data) =>
                        search === ""
                          ? data
                          : data.courseName.toLowerCase().includes(search)
                      )
                      .map((data) => (
                        <tr className="border-bottom" key={data.id}>
                          <td>
                            <span>{data.courseName}</span>
                          </td>
                          <td>{data.yearsToFinish} Years</td>
                          <td>
                            <Button
                              onClick={(e) => handleEdit(data.id)}
                              variant="info"
                              className="mr-2"
                              size="sm"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={(e) =>
                                handleDelete(data.id, data.courseName)
                              }
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
            {!courses && (
              <div className="mx-auto border border-light rounded p-3 pb-0 mb-5">
                <p className="text-center text-muted">No Data Found</p>
              </div>
            )}
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default CoursesList;
