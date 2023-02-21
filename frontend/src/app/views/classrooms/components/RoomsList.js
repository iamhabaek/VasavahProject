import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { SimpleCard } from "@gull";
import data from "../../manageClassrooms/color";
const RoomsList = ({ classrooms, quickFilter }) => {
  const [search, setSearch] = useState("");
  const sortedRooms = classrooms.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  return (
    <div>
      {classrooms && sortedRooms && (
        <SimpleCard title="Rooms" className="mt-5">
          <form className="mr-5">
            <input
              className="form-control "
              type="search"
              placeholder="Search Here...."
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </form>

          <div className="ul-widget-app__recent-messages">
            <div className="d-flex flex-column">
              {sortedRooms
                .filter((data) =>
                  search === ""
                    ? data
                    : data.title.toLowerCase().includes(search)
                )
                .map((classroom) => (
                  <div
                    key={classroom.id}
                    onClick={() => quickFilter(classroom.id)}
                    className="ul-widget-app__row-comments border-bottom-gray-200 mb-0"
                  >
                    <div className="mt-2">
                      <span className="mr-2 text-15">{classroom.title}</span>
                      <span
                        style={{
                          display: " inline-block",
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          backgroundColor: `${classroom.eventColor}`,
                        }}
                      ></span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </SimpleCard>
      )}
    </div>
  );
};

export default RoomsList;
