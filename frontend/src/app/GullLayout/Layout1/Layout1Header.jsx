import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import { Link } from "react-router-dom";
import AppContext from "app/appContext";
import LetteredAvatar from "react-lettered-avatar";
import { Fragment } from "react";
const Layout1Header = () => {
  const { user, logout } = useContext(AppContext);

  return (
    <Fragment>
      {user && (
        <div className="main-header">
          <div className="logo">
            <img src="/assets/images/logo.png" alt="" />
          </div>

          <div style={{ margin: "auto" }}></div>

          <div className="header-part-right">
            <div className="user col align-self-end">
              <Dropdown>
                <DropdownToggle
                  as="span"
                  className="toggle-hidden cursor-pointer"
                >
                  {/* <img
                src="/assets/images/faces/1.jpg"
                id="userDropdown"
                alt=""
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              /> */}
                  <LetteredAvatar
                    name={`${user.email.split("@")[0].charAt(0).toUpperCase()}`}
                  />
                </DropdownToggle>
                <DropdownMenu>
                  <div className="dropdown-header">
                    <i className="i-Lock-User mr-1"></i>
                    {user.email}
                  </div>
                  <Link to="/" className="dropdown-item cursor-pointer">
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
