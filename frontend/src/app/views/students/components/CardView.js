import React from "react";
import LetteredAvatar from "react-lettered-avatar";
import { format } from "date-fns";
import { Col, Container, Button, Spinner } from "react-bootstrap";
// Students list card view
const CardView = ({ list, handleEdit, search, handleDelete, loading }) => {
  return (
    <div>
      <Container>
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <div className="row">
            {list
              .filter((data) =>
                search === "" ? data : data.name.toLowerCase().includes(search)
              )
              .map((student) => (
                <div
                  key={student.id}
                  className="app-card text-sm col-lg-4 col-sm-4"
                >
                  <div className=" border-none shadow card">
                    <div className="clearFix">
                      <div
                        className={`${
                          student.status === "Regular"
                            ? "text-success"
                            : "text-danger"
                        } float-left p-2`}
                      >
                        <strong>{student.status}</strong>
                      </div>
                    </div>

                    <div className=".d-block mx-auto mw-100 p-3">
                      <LetteredAvatar
                        backgroundColor="#55535F"
                        color="#fff"
                        size={80}
                        name={student.name}
                      />
                    </div>
                    <div
                      style={{ backgroundColor: "#E7E5F1" }}
                      className=".d-block mw-100 "
                    >
                      <p className="font-weight-bold text-15 text-center p-2">{`${student.name}`}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-bold ">
                        Date added:
                      </span>
                      <span className="text-12">
                        {format(
                          new Date(student.created),
                          "MM/dd/yyyy HH:mm a"
                        )}
                      </span>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Course:
                      </span>
                      <span className="text-12">{student.course}</span>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Year Level:
                      </span>
                      <span className="text-12">{student.yearLevel}</span>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Birth Date:
                      </span>
                      <span className="text-12">{student.birthDate}</span>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Gender:
                      </span>
                      <span className="text-12">{student.gender}</span>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Address:
                      </span>
                      <span className="text-12">{student.address}</span>
                    </div>

                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Phone:
                      </span>
                      <span className="text-12">{student.phone}</span>
                    </div>

                    <div className="card-footer">
                      <div className="mc-footer">
                        <div className="d-flex flex-row justify-content-center align-items-center">
                          <button
                            className="btn btn-info px-2 text-12 py-1 mr-2  "
                            onClick={(e) => handleEdit(student.id)}
                          >
                            Edit
                          </button>
                          <Button
                            variant="danger"
                            type="submit"
                            className="btn-sm"
                            onClick={(e) =>
                              handleDelete(student.id, student.name)
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Col>
        {list.length === 0 && (
          <div className="d-flex justify-content-center p-3 pb-0 mb-5">
            <p className="text-center text-muted">No Data Found</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CardView;
