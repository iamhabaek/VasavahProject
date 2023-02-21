import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Breadcrumb } from "@gull";
import { deleteRequest } from "app/reducers/actions/ClassroomActions";
import SwapListView from "./components/SwapListView";
import SwapCardView from "./components/SwapCardView";
const SwapScheduleList = () => {
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
  const filteredRequests = requests.filter(
    (req) => req.requestedBy === user.uid && req.type === "Swap"
  );
  const cancelRequest = async (id, type, token, dispatch) => {
    await deleteRequest(id, type, token)(dispatch);
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
          { name: "Swap Schedule Requests" },
        ]}
      />
      <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
        <div className="ul-widget__head border-0">
          <div className="ul-widget__head-label"></div>
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
          <SwapListView
            list={filteredRequests}
            search={search}
            loading={loading}
            dispatch={dispatch}
            token={token}
            teachers={teachers}
            classroomSlots={classroomSlots}
            classrooms={classrooms}
            user={user}
            cancelRequest={cancelRequest}
          />
        )}
        {cardView && (
          // Card View Component
          <SwapCardView
            dispatch={dispatch}
            token={token}
            teachers={teachers}
            classroomSlots={classroomSlots}
            classrooms={classrooms}
            user={user}
            list={filteredRequests}
            search={search}
            loading={loading}
            cancelRequest={cancelRequest}
          />
        )}
      </Col>
    </Fragment>
  );
};

export default SwapScheduleList;
