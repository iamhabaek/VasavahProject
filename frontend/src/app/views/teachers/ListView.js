import React from "react";
import SubjectsModal from "./SubjectsModal";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
const ListView = ({ list, search, handleEdit, handleDelete }) => {
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
                  SUBJECT
                </th>
                <th scope="col" className="border-0">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {list
                .filter((data) =>
                  search === ""
                    ? data
                    : data.firstName.toLowerCase().includes(search) ||
                      data.lastName.toLowerCase().includes(search)
                )
                .map((data) => (
                  <tr key={data.id}>
                    <td className="border-0">
                      <span>{data.teacherName}</span>
                    </td>
                    <td className="border-0">
                      {data.subjects && (
                        <SubjectsModal subjects={data.subjects} />
                      )}
                    </td>
                    <td className="border-0">
                      <Dropdown>
                        <Dropdown.Toggle className="custom mr-3 mb-3 toggle-hidden border-0 d-flex flex-column">
                          <span className="_dot _inline-dot bg-white mb-1"></span>
                          <span className="_dot _inline-dot bg-white mb-1"></span>
                          <span className="_dot _inline-dot bg-white"></span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Link
                            onClick={(e) => handleEdit(data.id)}
                            className="dropdown-item cursor-pointer"
                          >
                            Edit
                          </Link>
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListView;
