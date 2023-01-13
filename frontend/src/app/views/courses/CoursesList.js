import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container, Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
// create axios function
import api from "app/api/api";
import { deleteCourse } from "app/reducers/actions/ClassroomActions";

const CoursesList = () => {
  // States from context provider
  const { courses, dispatch } = useContext(AppContext);

  const [search, setSearch] = useState("");

  const history = useHistory();
  // redirect to edit page function
  const handleEdit = (id) => {
    history.push(`/courses/edit/${id}`);
  };
  // delete data function
  const handleDelete = async (id) => {
    deleteCourse(id)(dispatch);
  };

  return (
    <Fragment>
      <Container>
        {courses && (
          <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
            <div className="card h-100 w-100">
              <div className="card-body">
                <div className="ul-widget__head border-0 mb-2">
                  <div className="ul-widget__head-label">
                    <h3 className="ul-widget__head-title">Courses</h3>
                  </div>
                  <div className="d-flex flex-row">
                    <form className="mr-5">
                      <input
                        className="form-control "
                        type="search"
                        placeholder="Search Here...."
                        onChange={(e) =>
                          setSearch(e.target.value.toLowerCase())
                        }
                      />
                    </form>
                    <Link to="/courses/add-course">
                      <Button alignRight>
                        {" "}
                        <i className="nav-icon i-Add"></i> Add Course
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="ul-widget-body">
                  <div className="ul-widget3">
                    <div className="ul-widget6__item--table">
                      <table className="table ">
                        <thead>
                          <tr className="ul-widget6__tr--sticky-th">
                            <th scope="col">Course Name</th>
                            <th scope="col">Years to Finish</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses
                            .filter((data) =>
                              search === ""
                                ? data
                                : data.courseName.toLowerCase().includes(search)
                            )
                            .map((data) => (
                              <tr key={data.id}>
                                <td>
                                  <span>{data.courseName}</span>
                                </td>
                                <td>{data.yearsToFinish} Years</td>
                                <td>
                                  <Dropdown>
                                    <Dropdown.Toggle className="custom mr-3 mb-3 toggle-hidden border-0 d-flex flex-column">
                                      <span className="_dot _inline-dot bg-white mb-1"></span>
                                      <span className="_dot _inline-dot bg-white mb-1"></span>
                                      <span className="_dot _inline-dot bg-white"></span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Link
                                        onClick={(e) => handleEdit(data.id)}
                                        className="dropdown-item cursor-pointer"
                                      >
                                        Edit
                                      </Link>
                                      <Dropdown.Item
                                        onClick={(e) => handleDelete(data.id)}
                                        className="dropdown-item cursor-pointer"
                                      >
                                        Delete
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
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
      </Container>
    </Fragment>
  );
};

export default CoursesList;
