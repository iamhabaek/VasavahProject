import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ListView from "./components/ListView";
import CardView from "./components/CardView";
import { Breadcrumb } from "@gull";

const UsersList = () => {
  const { users } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardView, setCardView] = useState(true);
  const [listView, setListView] = useState(false);
  const history = useHistory();

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
        routeSegments={[{ name: "Home", path: "/" }, { name: "Users List" }]}
      />
      <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
        <div className="ul-widget__head border-0">
          <div className="ul-widget__head-label"></div>
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
          <ListView list={users} search={search} loading={loading} />
        )}
        {cardView && (
          // Card View Component
          <CardView list={users} search={search} loading={loading} />
        )}
      </Col>
    </Fragment>
  );
};

export default UsersList;
