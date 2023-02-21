import React from "react";
import { Col, Container } from "react-bootstrap";
import Avatar from "react-avatar";
import Reauthenticate from "./Reauthenticate";
// Students list card view
const CardView = ({ list, handleEdit, search, handleDelete, loading }) => {
  return (
    <div>
      <Container>
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <div className="row">
            {list
              .filter((data) =>
                search === ""
                  ? data
                  : data.displayName.toLowerCase().includes(search)
              )
              .map((user) => (
                <div
                  key={user.uid}
                  className="app-card text-sm col-lg-4 col-sm-4"
                >
                  <div className=" border-none shadow card">
                    <div className=".d-block mx-auto mw-100 p-3">
                      <Avatar round size={80} name={user.displayName} />
                    </div>
                    <div
                      style={{ backgroundColor: "#E7E5F1" }}
                      className=".d-block mw-100 "
                    >
                      <p className="font-weight-bold text-15 text-center p-2">{`${user.displayName}`}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-bold ">Email:</span>
                      <span className="text-12">{user.email}</span>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Role:
                      </span>
                      <span className="text-12">
                        {user.customClaims.role === "_admin"
                          ? "Admin"
                          : "Teacher"}
                      </span>
                    </div>

                    <div className="card-footer">
                      <div className="mc-footer">
                        <div className="d-flex flex-row justify-content-center align-items-center">
                          {user.customClaims.role !== "_admin" && (
                            <Reauthenticate
                              name="Make an Admin"
                              uid={user.uid}
                            />
                          )}
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
