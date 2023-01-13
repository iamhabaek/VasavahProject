import React, { useContext, useState, Fragment, useEffect } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ClassroomOccupied from "./ClassroomOccupied";
import { Breadcrumb } from "@gull";
import { timeSlotCompress } from "./functions/timeSlotCompress";
const ClassroomsList = () => {
  const { classrooms } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const handleApplySlot = (id) => {
    history.push(`/classrooms/applyslot/${id}`);
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
                <Link to="/manage/list">
                  <Button>
                    {" "}
                    <i className="nav-icon i-Add "></i> Manage Classrooms
                  </Button>
                </Link>
                <div className="ul-widget__head-label"></div>
                <form>
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
                            Occupied
                          </th>
                          <th className="nowrap-th border-0 " scope="col">
                            Vacant
                          </th>
                          <th className="nowrap-th border-0 " scope="col">
                            Apply for Slots
                          </th>
                        </tr>
                      </thead>

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
                                <ClassroomOccupied classroomId={data.id} />
                              </td>
                              <td className="border-0 ">
                                {data.timeSlots &&
                                  timeSlotCompress(
                                    data.timeSlots,
                                    data.timeSlots.length
                                  ).map((timeSlot, idx) => (
                                    <span key={idx}>{timeSlot}</span>
                                  ))}
                              </td>
                              <td className="border-0 ">
                                <Button
                                  variant="success"
                                  className="text-12 py-1 px-2"
                                  onClick={() => handleApplySlot(data.id)}
                                >
                                  Apply
                                </Button>
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
      </Container>
    </Fragment>
  );
};

export default ClassroomsList;
