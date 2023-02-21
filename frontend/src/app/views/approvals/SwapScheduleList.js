import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col } from "react-bootstrap";
import SwapCardView from "./components/SwapCardView";
import SwapListView from "./components/SwapListView";
import { Breadcrumb, Loading } from "@gull";
import {
  approveSwap,
  rejectClose,
} from "app/reducers/actions/ClassroomActions";
import { Suspense } from "react";

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
  const [checked, setChecked] = useState(false);
  // Approve Schedule Swap
  const handleApprove = async (id, schedId, schedToSwap, token, dispatch) => {
    const slot1 = classroomSlots.find((slot) => slot.id === schedToSwap);
    const slot2 = classroomSlots.find((slot) => slot.id === schedId);
    const updatedValues = {
      slot1Id: slot1.id,
      slot1Start: slot2.startTime,
      slot1End: slot2.endTime,
      slot1StartDate: slot2.startDate,
      slot1EndDate: slot2.endDate,
      slot1Days: slot2.days,
      slot2Id: slot2.id,
      slot2Start: slot1.startTime,
      slot2End: slot1.endTime,
      slot2StartDate: slot1.startDate,
      slot2EndDate: slot1.endDate,
      slot2Days: slot1.days,
    };
    setLoading(true);
    await approveSwap(
      id,
      updatedValues,
      { status: "Approved" },
      token
    )(dispatch);
    setLoading(false);
  };
  const getFiltered = (checked) => {
    if (checked) {
      const filteredRequests = requests.filter(
        (slot) =>
          (slot.status === "Approved" || slot.status === "Rejected") &&
          slot.type === "Swap"
      );
      return filteredRequests;
    } else {
      const filteredRequests = requests.filter(
        (slot) => slot.status === "Pending" && slot.type === "Swap"
      );
      return filteredRequests;
    }
  };
  // Reject Schedule Swap
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
          { name: "Swap Schedule Approval" },
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
        <Suspense fallback={<Loading></Loading>}>
          {listView && (
            // List View Component

            <SwapListView
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
        </Suspense>
        <Suspense fallback={<Loading></Loading>}>
          {cardView && (
            // Card View Component

            <SwapCardView
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
          )}{" "}
        </Suspense>
      </Col>
    </Fragment>
  );
};

export default SwapScheduleList;
