import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import { Link, useHistory } from "react-router-dom";
import AppContext from "app/appContext";
import LetteredAvatar from "react-lettered-avatar";
import { Fragment } from "react";
import logo from "../../assets/header.jpg";
import Avatar from "react-avatar";
import { getTimeDifference } from "@utils";

const Layout1Header = () => {
  const { user, logout, classroomSlots, dispatch, token } =
    useContext(AppContext);
  const history = useHistory();
  const filteredSlots = classroomSlots.filter(
    (slot) => slot.isApproved === false
  );
  const handleClick = () => {
    history.push("/classrooms/application-slot-list");
  };
  return (
    <Fragment>
      {user && (
        <div className="main-header">
          <div className="logo">
            <img src={logo} />
          </div>

          <div style={{ margin: "auto" }}></div>
          <Dropdown>
            <Dropdown.Toggle as="span" className="toggle-hidden cursor-pointer">
              <div
                className="badge-top-container"
                role="button"
                id="dropdownNotification"
                data-toggle="dropdown"
              >
                <span className="badge badge-primary">
                  {user.role === "_admin" && filteredSlots.length}
                </span>
                <i className="i-Bell text-muted header-icon"></i>
              </div>
            </Dropdown.Toggle>
            <DropdownMenu className="notification-dropdown rtl-ps-none">
              {user.role === "_admin" &&
                filteredSlots.map((slot) => (
                  <div
                    onClick={handleClick}
                    key={slot.id}
                    className="dropdown-item d-flex"
                  >
                    <div className="notification-icon">
                      <i className="i-Over-Time-2 text-danger mr-1"></i>
                    </div>
                    <div className="notification-details flex-grow-1">
                      <p className="m-0 d-flex align-items-center">
                        <span>Time Slot Approval</span>
                        <span className="badge badge-pill badge-danger ml-1 mr-1">
                          {slot.status}
                        </span>
                        <span className="flex-grow-1"></span>
                        <span className="text-small text-muted ml-auto">
                          {getTimeDifference(new Date(slot.created))} ago
                        </span>
                      </p>
                      <p className="text-small text-muted m-0">
                        Pending Time Slot Approval
                      </p>
                    </div>
                  </div>
                ))}
            </DropdownMenu>
          </Dropdown>
          <div className="header-part-right">
            <div className="user col align-self-end">
              <Dropdown>
                <DropdownToggle
                  as="span"
                  className="toggle-hidden cursor-pointer"
                >
                  {user.photoURL ? (
                    <Avatar src={user.photoURL} size={40} />
                  ) : (
                    <Avatar
                      name={user.displayName ? user.displayName : user.email}
                      size={40}
                      round
                    />
                  )}
                </DropdownToggle>
                <DropdownMenu>
                  <div className="dropdown-header">
                    <i className="i-Lock-User mr-1"></i>
                    {user.displayName ? user.displayName : user.email}
                  </div>
                  <Link
                    to={`/user/profile/${user.uid}`}
                    className="dropdown-item cursor-pointer"
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/session/signin"
                    onClick={logout}
                    className="dropdown-item cursor-pointer"
                  >
                    Logout
                  </Link>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Layout1Header;
