import React from "react";
import { Col, Container } from "react-bootstrap";
import Reauthenticate from "./Reauthenticate";
const ListView = ({ list, search }) => {
  const theadEl = ["NAME", "EMAIL", "ROLE", "ACTIONS"];
  return (
    <Container>
      <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
        <div className="card border-0">
          <div className="card-body border-0">
            <table className="table ">
              <thead>
                <tr className="ul-widget6__tr--sticky-th">
                  {theadEl.map((head, idx) => (
                    <th key={idx} scope="col" className="border-0 text-primary">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              {list.length !== 0 && (
                <tbody>
                  {list
                    .filter((data) =>
                      search === ""
                        ? data
                        : data.name.toLowerCase().includes(search)
                    )
                    .map((user) => (
                      <tr
                        className="border-bottom border-dotted"
                        key={user.uid}
                      >
                        <td className="border-0">
                          <span>{user.displayName}</span>
                        </td>
                        <td className="border-0">
                          <span>{user.email}</span>
                        </td>
                        <td className="border-0">
                          {user.customClaims.role === "_admin"
                            ? "Admin"
                            : "Teacher"}
                        </td>

                        <td className="border-0">
                          {user.customClaims.role !== "_admin" && (
                            <Reauthenticate
                              name="Make an Admin"
                              uid={user.uid}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
          {list.length === 0 && (
            <div className="mx-auto border border-light rounded p-3 pb-0 mb-5">
              <p className="text-center text-muted">No Data Found</p>
            </div>
          )}
        </div>
      </Col>
    </Container>
  );
};

export default ListView;
