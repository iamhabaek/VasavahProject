import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container, Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { deleteSubject } from "app/reducers/actions/ClassroomActions";
import { Breadcrumb } from "@gull";
import { nanoid } from "nanoid";
const SubjectsLists = () => {
  // States from context provider
  const { subjects, dispatch, user, token } = useContext(AppContext);

  const [search, setSearch] = useState("");

  const history = useHistory();
  // Edit Subject redirect to edits page
  const handleEdit = (id) => {
    history.push(`/subjects/edit/${id}`);
  };
  // Delete Subjet redirect to list page
  const handleDelete = (id, name) => {
    const notifications = {
      id: nanoid(),
      created: Date.now(),
      user: user.email,
      isViewed: false,
      action: "delete",
      content: {
        name: name,
        location: "subject",
        description: "click to see more information",
      },
    };
    deleteSubject(id, notifications, token)(dispatch);
  };

  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Subject List", path: "/subjects/subjects-list" },
        ]}
      />
      <Container>
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <div className="card ">
            <div className="card-body border-0">
              <div className="ul-widget__head mb-2 border-0">
                <div className="ul-widget__head-label">
                  <Link to="/subjects/add-subject">
                    <Button>
                      {" "}
                      <i className="nav-icon i-Add"></i> Add Subject
                    </Button>
                  </Link>
                </div>
                <div className="d-flex flex-column">
                  <form className="mr-5">
                    <input
                      className="form-control "
                      type="search"
                      placeholder="Search Here...."
                      onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                  </form>
                  <div>
                    <Link
                      to="/subjects/report"
                      alignLeft
                      className="btn btn-success mr-auto px-3 py-1 my-5"
                    >
                      Generate Report
                    </Link>
                  </div>
                </div>
              </div>

              <table className="table ">
                <thead>
                  <tr className="ul-widget6__tr--sticky-th border-0">
                    <th className="text-primary border-0" scope="col">
                      SUBJECT NAME
                    </th>
                    <th className="text-primary border-0" scope="col">
                      UNITS
                    </th>
                    <th className="text-primary border-0" scope="col">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                {subjects.length !== 0 && (
                  <tbody>
                    {subjects
                      .filter((data) =>
                        search === ""
                          ? data
                          : data.subjectName.toLowerCase().includes(search)
                      )
                      .map((subject) => (
                        <tr className="border-bottom" key={subject.id}>
                          <td>{subject.subjectName}</td>
                          <td>{subject.units}</td>
                          <td>
                            <Button
                              onClick={(e) => handleEdit(subject.id)}
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
                                handleDelete(subject.id, subject.subjectName)
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
            {subjects.length === 0 && (
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

export default SubjectsLists;
