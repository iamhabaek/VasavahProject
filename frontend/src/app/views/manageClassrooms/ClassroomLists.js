import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container, Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Breadcrumb } from "@gull";
import { deleteClassroom } from "app/reducers/actions/ClassroomActions";
const ClassroomLists = () => {
  const { classrooms, dispatch, user, token } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const handleEdit = (id) => {
    history.push(`/manage/edit/${id}`);
  };

  const handleDelete = async (id) => {
    deleteClassroom(id, token)(dispatch);
  };

  return (
    <Fragment>
      <Container>
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <Breadcrumb
            routeSegments={[
              { name: "Home", path: "/dashboard" },
              { name: "Manage List" },
            ]}
          />
          <div className="card  ">
            <div className="card-body">
              <div className="ul-widget__head border-0 mb-2">
                <Link to="/manage/add">
                  <Button>
                    {" "}
                    <i className="nav-icon i-Add "></i> Add Classroom
                  </Button>
                </Link>
                <div className="ul-widget__head-label"></div>
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
                    <th className="nowrap-th border-0 text-primary" scope="col">
                      ROOM
                    </th>
                    <th className="nowrap-th border-0 text-primary" scope="col">
                      EVENT COLOR
                    </th>
                    <th className="nowrap-th border-0 text-primary" scope="col">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                {classrooms.length !== 0 && (
                  <tbody>
                    {classrooms
                      .filter((data) =>
                        search === ""
                          ? data
                          : data.title.toLowerCase().includes(search)
                      )
                      .sort((a, b) => {
                        if (a.title < b.title) {
                          return -1;
                        }
                        if (a.title > b.title) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((data) => (
                        <tr className="border-bottom" key={data.id}>
                          <td className="border-0 ">
                            <span>{data.title}</span>
                          </td>
                          <td className="border-0 ">
                            <span
                              style={{
                                display: " inline-block",
                                width: "50px",
                                height: "20px",
                                // borderRadius: "50%",
                                backgroundColor: `${data.eventColor}`,
                              }}
                            ></span>
                          </td>
                          <td className="border-0 ">
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
                              onClick={(e) => handleDelete(data.id)}
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
            {classrooms.length === 0 && (
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

export default ClassroomLists;
