import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Breadcrumb } from "@gull";
import { deleteRequest } from "app/reducers/actions/ClassroomActions";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import CloseListView from "./components/CloseListView";
import CloseCardView from "./components/CloseCardView";
const CloseScheduleList = () => {
  const {
    requests,
    dispatch,
    user,
    token,
    teachers,
    classrooms,
    classroomSlots,
  } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardView, setCardView] = useState(true);
  const [listView, setListView] = useState(false);
  const history = useHistory();
  const handleEdit = (id) => {
    history.push(`/students/edit/${id}`);
  };
  const filteredRequests = requests.filter(
    (req) => req.requestedBy === user.uid && req.type === "Close"
  );
  const cancelRequest = async (id, type, token, dispatch) => {
    setLoading(true);
    await deleteRequest(id, type, token)(dispatch);
    setLoading(false);
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
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Close Schedule Requests" },
        ]}
      />
      <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
        <div className="ul-widget__head border-0"></div>
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
          <CloseListView
            list={filteredRequests}
            search={search}
            loading={loading}
            teachers={teachers}
            classroomSlots={classroomSlots}
            classrooms={classrooms}
            user={user}
            token={token}
            dispatch={dispatch}
            cancelRequest={cancelRequest}
          />
        )}
        {cardView && (
          // Card View Component
          <CloseCardView
            teachers={teachers}
            classroomSlots={classroomSlots}
            classrooms={classrooms}
            list={filteredRequests}
            search={search}
            loading={loading}
            token={token}
            dispatch={dispatch}
            cancelRequest={cancelRequest}
            user={user}
          />
        )}
      </Col>
    </Fragment>
  );
};

export default CloseScheduleList;
