import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { navigations } from "../../navigations";
import { merge } from "lodash";
import { classList } from "@utils";
import Srcollbar from "react-perfect-scrollbar";
import { DropDownMenu } from "@gull";
import ScrollBar from "react-perfect-scrollbar";
import AppContext from "app/appContext";
const Layout1Sidenav = ({ user }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [secondaryNavOpen, setSecondaryNavOpen] = useState(false);
  const filteredNavigations =
    user.role && navigations.filter((nav) => nav.auth.includes(user.role));

  const onMainItemMouseEnter = (item) => {
    if (item.type === "dropDown") {
      setSelectedItem(item);
      openSecSidenav();
    } else {
      setSelectedItem(item);
      closeSecSidenav();
    }
  };
  const onMainItemMouseLeave = () => {
    // this.closeSecSidenav();
  };

  function openSecSidenav() {
    setSecondaryNavOpen(true);
  }

  function closeSecSidenav() {
    setSecondaryNavOpen(false);
  }

  return (
    <div className="side-content-wrap">
      <Srcollbar
        className={classList({
          "sidebar-left o-hidden rtl-ps-none": true,
          open: true,
        })}
        // id="mainsidenav"
      >
        <ul className="navigation-left">
          {user &&
            filteredNavigations &&
            filteredNavigations.map((item, i) => (
              <li
                className={classList({
                  "nav-item": true,
                  active: selectedItem === item,
                })}
                onMouseEnter={() => {
                  onMainItemMouseEnter(item);
                }}
                onMouseLeave={onMainItemMouseLeave}
                key={i}
              >
                {item.path && item.type !== "extLink" && (
                  <NavLink className="nav-item-hold" to={item.path}>
                    <i className={`nav-icon ${item.icon}`}></i>
                    <span className="nav-text">{item.name}</span>
                  </NavLink>
                )}
                {item.path && item.type === "extLink" && (
                  <a className="nav-item-hold" href={item.path}>
                    <i className={`nav-icon ${item.icon}`}></i>
                    <span className="nav-text">{item.name}</span>
                  </a>
                )}
                {!item.path && (
                  <div className="nav-item-hold">
                    <i className={`nav-icon ${item.icon}`}></i>
                    <span className="nav-text">{item.name}</span>
                  </div>
                )}
                <div className="triangle"></div>
              </li>
            ))}
        </ul>
      </Srcollbar>

      <ScrollBar
        className={classList({
          "sidebar-left-secondary o-hidden rtl-ps-none": true,
          open: secondaryNavOpen,
        })}
      >
        {selectedItem && selectedItem.sub && (
          <DropDownMenu
            menu={selectedItem.sub}
            closeSecSidenav={closeSecSidenav}
          ></DropDownMenu>
        )}
        <span></span>
      </ScrollBar>
      <div
        onMouseEnter={closeSecSidenav}
        className={classList({
          "sidebar-overlay": true,
          open: secondaryNavOpen,
        })}
      ></div>
    </div>
  );
};

export default Layout1Sidenav;
