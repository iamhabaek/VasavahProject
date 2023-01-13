import React from "react";

const CardView = ({ list, search, handleEdit, handleDelete }) => {
  return (
    <div className="d-flex flex-row flex-wrap">
      {list
        .filter((data) =>
          search === ""
            ? data
            : data.firstName.toLowerCase().includes(search) ||
              data.lastName.toLowerCase().includes(search)
        )
        .map((data) => (
          <div key={data.id} className="card card-profile-1 mb-4 mr-3">
            <div className="card-body text-center">
              <div className="avatar box-shadow-2 mb-3"></div>
              <h5 className="m-0">{data.teacherName}</h5>
              <p>{data.subject}</p>
              <div className="card-socials-simple mt-4">
                <button
                  className="btn btn-success px-2 py-1 mr-2  "
                  onClick={(e) => handleEdit(data.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger px-2 py-1"
                  onClick={(e) => handleDelete(data.id)}
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
