import React from "react";
import LetteredAvatar from "react-lettered-avatar";
// Students list card view
const CardView = ({ list, handleEdit, search, handleDelete }) => {
  return (
    <div className="row col-md-12">
      {list
        .filter((data) =>
          search === ""
            ? data
            : data.firstName.toLowerCase().includes(search) ||
              data.lastName.toLowerCase().includes(search)
        )
        .map((student) => (
          <div className="card card-profile-1 col-md-3 mb-4 mr-3">
            <div className="card-body text-center">
              <div className="d-flex justify-content-center mb-3">
                <LetteredAvatar name={student.name} />
              </div>
              <h5 className="m-0">{`${student.name}`}</h5>
              <p className="mt-0">{`${student.course} ${student.yearLevel}`}</p>

              <div className="card-socials-simple mt-4">
                <button
                  className="btn btn-success px-2 text-12 py-1 mr-2  "
                  onClick={(e) => handleEdit(student.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger text-12 px-2 py-1"
                  onClick={(e) => handleDelete(student.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardView;
