import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ListView from "./ListView";
import CardView from "./CardView";
import { Breadcrumb } from "@gull";
import Swal from "sweetalert2";
import { deleteStudent } from "app/reducers/actions/ClassroomActions";
const StudentsList = () => {
  const { students, dispatch, isSuccess } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [cardView, setCardView] = useState(false);
  const [listView, setListView] = useState(true);
  const history = useHistory();
  console.log(students);
  const handleEdit = (id) => {
    history.push(`/students/edit/${id}`);
  };
  const handleDelete = async (id) => {
    deleteStudent(id)(dispatch);
  };
  // Change to Card View function
  const handleCardView = () => {
    setListView(false);
    setCardView(true);
  };
  // Change to List View function
  const handleListView = () => {
    setCardView(false);
    setListView(true);
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Students List" }]}
      />
      <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
        <div className="ul-widget__head border-0">
          <div className="ul-widget__head-label">
            <Link to="/students/add-student">
              <Button>
                {" "}
                <i className="nav-icon i-Add "></i> Add Student
              </Button>
            </Link>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <form className="mr-5">
              <input
                className="form-control "
                type="search"
                placeholder="Search Here...."
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            </form>
          </div>
        </div>
        <div className="mb-5 mt-4 d-flex flex-row  align-items-center  justify-content-end">
          <span>View By:</span>
          <div className="ml-2 border border-dark rounded">
            <button
              onClick={handleListView}
              className={`btn ${
                listView && "btn-primary"
              } p-1 rounded-top rounded-left rounded-bottom`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="8"
                fill="currentColor"
                class="bi bi-list-columns-reverse"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5Zm-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z"
                />
              </svg>
            </button>
            <button
              onClick={handleCardView}
              className={`btn ${
                cardView && "btn-primary"
              } p-1 rounded-top rounded-right rounded-bottom`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="8"
                fill="currentColor"
                class="bi bi-table"
                viewBox="0 0 16 16"
              >
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
              </svg>
            </button>
          </div>
        </div>
        {listView && (
          // List View Component
          <ListView
            list={students}
            search={search}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
        {cardView && (
          // Card View Component
          <CardView
            list={students}
            search={search}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </Col>
    </Fragment>
  );
};

export default StudentsList;
