import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ListView from "./components/ListView";
import CardView from "./components/CardView";
import { Breadcrumb } from "@gull";
import { nanoid } from "nanoid";
import { deleteTeacher } from "app/reducers/actions/ClassroomActions";
import Swal from "sweetalert2";
const TeachersList = () => {
  const { teachers, dispatch, user, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const history = useHistory();

  const [cardView, setCardView] = useState(true);
  const [listView, setListView] = useState(false);
  // redirect to edit page function
  const handleEdit = (id) => {
    history.push(`/teachers/edit/${id}`);
  };
  // delete teacher function
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
          await deleteTeacher(id, notifications, token)(dispatch);
          Swal.fire("Deleted!", "Teacher has been deleted.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
    setLoading(false);
  };
  const handleCardView = () => {
    setListView(false);
    setCardView(true);
  };
  const handleListView = () => {
    setCardView(false);
    setListView(true);
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Teachers List" }]}
      />
      <Container>
        {teachers && (
          <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
            <div className="ul-widget__head border-0 mb-2">
              <div className="ul-widget__head-label">
                <Link to="/teachers/add-teacher">
                  <Button>
                    {" "}
                    <i className="nav-icon i-Add"></i> Add Teacher
                  </Button>
                </Link>
              </div>
              <div className="d-flex flex-column">
                <form className="mr-5">
                  <input
                    className="form-control "
                    type="search"
                    placeholder="Search Here...."
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                  />
                </form>
                <div>
                  <Link
                    to="/teachers/report"
                    alignLeft
                    className="btn btn-success mr-auto px-3 py-1 mt-5"
                  >
                    Generate Report
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-12 my-5">
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
              <ListView
                list={teachers}
                search={search}
                handleEdit={handleEdit}
                loading={loading}
                handleDelete={handleDelete}
              />
            )}
            {cardView && (
              <CardView
                list={teachers}
                search={search}
                loading={loading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </Col>
        )}
      </Container>
    </Fragment>
  );
};

export default TeachersList;
