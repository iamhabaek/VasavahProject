import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container, Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Breadcrumb } from "@gull";
import Swal from "sweetalert2";
import api from "app/api/api";
import { deleteClassroom } from "app/reducers/actions/ClassroomActions";
const ClassroomLists = () => {
  const { classrooms, dispatch } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const handleEdit = (id) => {
    history.push(`/manage/edit/${id}`);
  };

  const handleDelete = async (id) => {
    deleteClassroom(id)(dispatch);
  };

  return (
    <Fragment>
      <Container>
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <Breadcrumb
            routeSegments={[
              { name: "Home", path: "/" },
              { name: "Classrooms List" },
            ]}
          />
          <div className="card border-0 ">
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
              <div className="ul-widget-body">
                <div className="ul-widget3">
                  <div className="ul-widget6__item--table">
                    <table className="table">
                      <thead>
                        <tr className="">
                          <th className="nowrap-th border-0 " scope="col">
                            Room
                          </th>
                          <th className="nowrap-th border-0 " scope="col">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      {classrooms.length !== 0 ? (
                        <tbody>
                          {classrooms
                            .filter((data) =>
                              search === ""
                                ? data
                                : data.roomName.toLowerCase().includes(search)
                            )
                            .map((data) => (
                              <tr key={data.id}>
                                <td className="border-0 ">
                                  <span>{data.roomName}</span>
                                </td>
                                <td className="border-0 ">
                                  <Dropdown>
                                    <Dropdown.Toggle className="custom mr-3 mb-3 toggle-hidden border-0 d-flex flex-column">
                                      <span className="_dot _inline-dot bg-white mb-1"></span>
                                      <span className="_dot _inline-dot bg-white mb-1"></span>
                                      <span className="_dot _inline-dot bg-white"></span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item
                                        onClick={() => handleEdit(data.id)}
                                        className="dropdown-item cursor-pointer"
                                      >
                                        Edit
                                      </Dropdown.Item>

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
    </Fragment>
  );
};

export default ClassroomLists;
