import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col } from "react-bootstrap";
import ListView from "./components/ListView";
import CardView from "./components/CardView";
import { Breadcrumb, Loading } from "@gull";
import { approveSlot, denySlot } from "app/reducers/actions/ClassroomActions";
import Swal from "sweetalert2";
import { Suspense } from "react";
const SlotApplicationList = () => {
  const {
    classroomSlots,
    dispatch,
    user,
    token,
    teachers,
    subjects,
    classrooms,
  } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [cardView, setCardView] = useState(true);
  const [listView, setListView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleApprove = async (id) => {
    setLoading(true);
    await approveSlot(id, { isApproved: true }, token)(dispatch);
    setLoading(false);
  };
  const handleDeny = async (id) => {
    Swal.fire({
      title: "Confirm to Deny",
      text: "Are you sure you want to deny? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        await denySlot(id, token)(dispatch);
        setLoading(false);
      }
    });
  };

  const getFiltered = (checked) => {
    if (checked) {
      const filteredSlots = classroomSlots.filter(
        (slot) => slot.isApproved === true
      );
      return filteredSlots;
    } else {
      const filteredSlots = classroomSlots.filter(
        (slot) => slot.isApproved === false
      );
      return filteredSlots;
    }
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
          { name: "Classroom Schedule Approval" },
        ]}
      />
      <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
        <div className="ul-widget__head border-0">
          <div className="ul-widget__head-label"></div>
        </div>
        <div className="col-xl-12 my-5">
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
          <Suspense fallback={<Loading></Loading>}>
            <ListView
              teachers={teachers}
              subjects={subjects}
              classrooms={classrooms}
              search={search}
              classroomSlots={getFiltered(checked)}
              handleApprove={handleApprove}
              handleDeny={handleDeny}
              loading={loading}
            />
          </Suspense>
        )}
        {cardView && (
          // Card View Component
          <CardView
            teachers={teachers}
            subjects={subjects}
            classrooms={classrooms}
            classroomSlots={getFiltered(checked)}
            search={search}
            handleApprove={handleApprove}
            handleDeny={handleDeny}
            loading={loading}
          />
        )}
      </Col>
    </Fragment>
  );
};

export default SlotApplicationList;
