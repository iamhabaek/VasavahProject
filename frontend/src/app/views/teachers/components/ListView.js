import React from "react";
import { Dropdown, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";
const ListView = ({ list, search, handleEdit, handleDelete }) => {
  const theadEl = [
    "NAME",
    "BIRTH DATE",
    "SUBJECTS",
    "PHONE",
    "GENDER",
    "ADDRESS",
    "DATE ADDED",
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
                        : data.teacherName.toLowerCase().includes(search)
                    )
                    .map((data) => (
                      <tr className="border-bottom border-dotted" key={data.id}>
                        <td className="border-0">
                          <span>{data.teacherName}</span>
                        </td>
                        <td className="border-0">
                          <span>{data.birthDate}</span>
                        </td>
                        <td className="border-0">
                          <div className="d-flex flex-column">
                            {data.subjects.map((subject, idx) => (
                              <span key={idx}>{subject.label}</span>
                            ))}
                          </div>
                        </td>
                        <td className="border-0">
                          <span>{data.phone}</span>
                        </td>
                        <td className="border-0">
                          <span>{data.gender}</span>
                        </td>
                        <td className="border-0">
                          <span>{data.address}</span>
                        </td>

                        <td className="border-0">
                          <span>
                            {format(data.created, "yyyy/MM/dd HH:mm: a")}
                          </span>
                        </td>
                        <td className="border-0">
                          <Dropdown>
                            <Dropdown.Toggle className="custom mr-3 mb-3 toggle-hidden bg-white border-none d-flex flex-column">
                              <span className="_dot _inline-dot bg-primary mb-1"></span>
                              <span className="_dot _inline-dot bg-primary mb-1"></span>
                              <span className="_dot _inline-dot bg-primary mb-1"></span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Link
                                onClick={(e) => handleEdit(data.id)}
                                className="dropdown-item cursor-pointer"
                              >
                                Edit
                              </Link>
                              <Dropdown.Item
                                onClick={(e) =>
                                  handleDelete(data.id, data.teacherName)
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
