import React from "react";
import Avatar from "react-avatar";
import format from "date-fns/format";
import { Col, Container, Button, Spinner } from "react-bootstrap";
const CardView = ({ list, loading, search, handleEdit, handleDelete }) => {
  return (
    <div>
      <Container>
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <div className="row">
            {list
              .filter((data) =>
                search === ""
                  ? data
                  : data.teacherName.toLowerCase().includes(search)
              )
              .map((data) => (
                <div
                  key={data.id}
                  className="app-card text-sm col-lg-4 col-sm-4"
                >
                  <div className=" border-none shadow card">
                    <div className="clearFix"></div>

                    <div className=".d-block mx-auto mw-100 p-3">
                      {data.photoURL ? (
                        <Avatar round size={80} src={data.photoURL} />
                      ) : (
                        <Avatar round size={80} name={data.teacherName} />
                      )}
                    </div>
                    <div
                      style={{ backgroundColor: "#E7E5F1" }}
                      className=".d-block mw-100 "
                    >
                      <p className="font-weight-bold text-15 text-center p-2">{`${data.teacherName}`}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-bold ">
                        Date added:
                      </span>
                      <span className="text-12">
                        {format(data.created, "yyyy/MM/dd HH:mm: a")}
                      </span>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Subjects:
                      </span>
                      <div className="d-flex flex-column">
                        {data.subjects.map((subject) => (
                          <span className="text-12">{subject.label}</span>
                        ))}
                      </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Address:
                      </span>
                      <span className="text-12">{data.address}</span>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Birth Date:
                      </span>
                      <span className="text-12">{data.birthDate}</span>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Gender:
                      </span>
                      <span className="text-12">{data.gender}</span>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Address:
                      </span>
                      <span className="text-12">{data.phone}</span>
                    </div>

                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Email:
                      </span>
                      <span className="text-12">{data.email}</span>
                    </div>
                    <div className="card-footer">
                      <div className="mc-footer">
                        <div
                          className="d-flex flex-row justify-content-center align-items-center 
              "
                        >
                          <button
                            className="btn btn-sm btn-info px-2 text-12 py-1 mr-2  "
                            onClick={(e) => handleEdit(data.id)}
                          >
                            Edit
                          </button>
                          <Button
                            variant="danger"
                            type="submit"
                            className="btn-sm"
                            onClick={(e) =>
                              handleDelete(data.id, data.teacherName)
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
          {list.length === 0 && (
            <div className="d-flex justify-content-center p-3 pb-0 mb-5">
              <p className="text-center text-muted">No Data Found</p>
            </div>
          )}
        </Col>
      </Container>
    </div>
  );
};

export default CardView;
