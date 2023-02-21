import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ListView from "./components/ListView";
import CardView from "./components/CardView";
import { Breadcrumb } from "@gull";
import { deleteStudent } from "app/reducers/actions/ClassroomActions";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
const StudentsList = () => {
  const { students, dispatch, user, token } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardView, setCardView] = useState(true);
  const [listView, setListView] = useState(false);
  const history = useHistory();
  const handleEdit = (id) => {
    history.push(`/students/edit/${id}`);
  };
  const handleDelete = async (id, name) => {
    const notifications = {
      id: nanoid(),
      created: Date.now(),
      user: user.email,
      isViewed: false,
      action: "delete",
      content: {
        name: name,
        location: "teacher",
        description: "click to see more information",
      },
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await deleteStudent(id, notifications, token)(dispatch);
          Swal.fire("Deleted!", "Student has been deleted.", "success");
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    });
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
        <div className="col-xl-12 mt-5">
          <div className="text-right form-group">
            <label className="text-dark">View By: </label>
            <div className="btn-group ml-1">
              <button
                title="ListView"
                onClick={handleListView}
                className={
                  listView
                    ? "btn btn-primary btn-sm"
                    : "btn btn-outline-primary btn-sm"
                }
              >
                <i className="i-Newspaper"></i>
              </button>
              <button
                title="Widgets"
                onClick={handleCardView}
                className={
                  cardView
                    ? "btn btn-primary btn-sm"
                    : "btn btn-outline-primary btn-sm"
                }
              >
                <i className="i-Split-Four-Square-Window"></i>
              </button>
            </div>
          </div>
        </div>
        {listView && (
          // List View Component
          <ListView
            list={students}
            search={search}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            loading={loading}
          />
        )}
        {cardView && (
          // Card View Component
          <CardView
            list={students}
            search={search}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            loading={loading}
          />
        )}
      </Col>
    </Fragment>
  );
};

export default StudentsList;
