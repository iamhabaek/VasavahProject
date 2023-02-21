import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col } from "react-bootstrap";
import CloseListView from "./components/CloseListView";
import CloseCardView from "./components/CloseCardView";
import { Breadcrumb } from "@gull";
import {
  approveClose,
  rejectClose,
} from "app/reducers/actions/ClassroomActions";
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
  const [checked, setChecked] = useState(false);
  // Approve Close Schedule
  const handleApprove = async (id, schedId, token, dispatch) => {
    setLoading(true);
    await approveClose(id, schedId, { status: "Approved" }, token)(dispatch);
    setLoading(false);
  };
  // Filter request
  const getFiltered = (checked) => {
    if (checked) {
      const filteredRequests = requests.filter(
        (slot) =>
          (slot.status === "Approved" || slot.status === "Rejected") &&
          slot.type === "Close"
      );
      return filteredRequests;
    } else {
      const filteredRequests = requests.filter(
        (slot) => slot.status === "Pending" && slot.type === "Close"
      );
      return filteredRequests;
    }
  };
  // Reject Close Schedule

  const handleReject = async (id, reason) => {
    const status = {
      reason: reason,
      status: "Rejected",
    };
    await rejectClose(id, status)(dispatch);
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
          { name: "Close Schedule Approval" },
        ]}
      />
      <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
        <div className="ul-widget__head border-0">
          <div className="ul-widget__head-label"></div>
        </div>
        <div className="col-xl-12 mt-5">
          <div className="form-group">
            <input
              className="mr-2"
              type="checkbox"
              onChange={() => setChecked(!checked)}
              name="checked"
              defaultChecked={checked}
            />
            <label>Completed Applications</label>
          </div>
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
            list={getFiltered(checked)}
            search={search}
            handleApprove={handleApprove}
            handleReject={handleReject}
            loading={loading}
            dispatch={dispatch}
            token={token}
            teachers={teachers}
            classroomSlots={classroomSlots}
            classrooms={classrooms}
          />
        )}
        {cardView && (
          // Card View Component
          <CloseCardView
            dispatch={dispatch}
            token={token}
            teachers={teachers}
            classroomSlots={classroomSlots}
            classrooms={classrooms}
            list={getFiltered(checked)}
            search={search}
            handleApprove={handleApprove}
            handleReject={handleReject}
            loading={loading}
          />
        )}
      </Col>
    </Fragment>
  );
};

export default CloseScheduleList;
