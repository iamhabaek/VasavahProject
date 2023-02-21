import React from "react";
import { Dropdown, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";
const ListView = ({ list, search, handleDelete }) => {
  const theadEl = [
    "NAME",
    "BIRTH DATE",
    "ADDRESS",
    "COURSE",
    "YEAR LEVEL",
    "GENDER",
    "DATE ADDED",
    "STATUS",
    "ACTIONS",
  ];
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
                    .map((student) => (
                      <tr
                        className="border-bottom border-dotted"
                        key={student.id}
                      >
                        <td className="border-0">
                          <span>{student.name}</span>
                        </td>
                        <td className="border-0">{student.birthDate}</td>
                        <td className="border-0">
                          <span>{student.address}</span>
                        </td>
                        <td className="border-0">{student.course}</td>
                        <td className="border-0">{student.yearLevel}</td>
                        <td className="border-0">{student.gender}</td>
                        <td className="border-0">
                          {" "}
                          {format(student.created, "yyyy/MM/dd HH:mm: a")}
                        </td>
                        <td className="border-0">
                          <span
                            class={`badge badge-pill ${
                              student.status === "Regular"
                                ? "badge-success"
                                : "badge-danger"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="border-0">
                          <Dropdown>
                            <Dropdown.Toggle className=" mr-3 mb-3 toggle-hidden bg-white border-none d-flex flex-column">
                              <span className="_dot _inline-dot bg-primary mb-1"></span>
                              <span className="_dot _inline-dot bg-primary mb-1"></span>
                              <span className="_dot _inline-dot bg-primary"></span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Link
                                to={`/students/edit/${student.id}`}
                                className="dropdown-item cursor-pointer"
                              >
                                Edit
                              </Link>
                              <Dropdown.Item
                                onClick={(e) =>
                                  handleDelete(student.id, student.name)
                                }
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
