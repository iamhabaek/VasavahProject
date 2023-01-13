import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListView = ({ list, handleEdit, search, handleDelete }) => {
  return (
    <div className="ul-widget-body">
      <div className="ul-widget3">
        <div className="ul-widget6__item--table">
          <table className="table ">
            <thead>
              <tr className="ul-widget6__tr--sticky-th">
                <th scope="col" className="border-0">
                  NAME
                </th>
                <th scope="col" className="border-0">
                  AGE
                </th>
                <th scope="col" className="border-0">
                  ADDRESS
                </th>
                <th scope="col" className="border-0">
                  COURSE
                </th>
                <th scope="col" className="border-0">
                  YEAR LEVEL
                </th>
                <th scope="col" className="border-0">
                  GENDER
                </th>
                <th scope="col" className="border-0">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {list
                .sort()
                .filter((data) =>
                  search === ""
                    ? data
                    : data.firstName.toLowerCase().includes(search) ||
                      data.lastName.toLowerCase().includes(search)
                )
                .map((student) => (
                  <tr key={student.id}>
                    <td className="border-0">
                      <span>{student.name}</span>
                    </td>
                    <td className="border-0">{student.age}</td>
                    <td className="border-0">
                      <span>{student.address}</span>
                    </td>
                    <td className="border-0">{student.course}</td>
                    <td className="border-0">{student.yearLevel}</td>
                    <td className="border-0">{student.gender}</td>
                    <td className="border-0">
                      <Dropdown>
                        <Dropdown.Toggle className="custom mr-3 mb-3 toggle-hidden border-0 d-flex flex-column">
                          <span className="_dot _inline-dot bg-white mb-1"></span>
                          <span className="_dot _inline-dot bg-white mb-1"></span>
                          <span className="_dot _inline-dot bg-white"></span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Link
                            onClick={(e) => handleEdit(student.id)}
                            className="dropdown-item cursor-pointer"
                          >
                            Edit
                          </Link>
                          <Dropdown.Item
                            onClick={(e) => handleDelete(student.id)}
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListView;
