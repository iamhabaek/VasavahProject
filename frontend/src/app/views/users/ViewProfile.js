import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "react-avatar";
import AppContext from "app/appContext";
import api from "app/api/api";
import Swal from "sweetalert2";
import { Button, Spinner } from "react-bootstrap";
import { format } from "date-fns";
import UpdatePassword from "./components/UpdatePassword";
const ViewProfile = () => {
  const { user, setUser, teachers, dispatch, token } = useContext(AppContext);
  const [image, setImage] = useState(user.photoURL);
  const [upload, setUpload] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const teacher = teachers.find((teacher) => teacher.id === user.uid);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(URL.createObjectURL(file));
    setUpload(file);
    setIsSelected(true);
  };
  const handleCancel = () => {
    setUpload(false);
    setImage(user.photoURL);
    setIsSelected(false);
  };
  const handleSave = async () => {
    if (!upload) {
      Swal.fire("Please choose a file", "error");
    }
    let formData = new FormData();

    formData.append("profile", upload);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      const response = await api.put(`/users/${user.uid}`, formData, config);
      const data = await response.data.data;
      setUser({ ...user, photoURL: data });
      setImage(data);
      setIsSelected(false);
      setUpload("");
      setLoading(false);
      history.push(`/user/profile/${user.uid}`);
    } catch (error) {
      Swal.fire(`${error.response.data.message}`, "error");
    }
  };
  return (
    <div className="col-lg-12 col-xl-12 mt-3">
      {teacher && (
        <div>
          <div className="card bg-primary">
            <div className="card-body p-5">
              <div className="user-profile mb-4">
                <div className="ul-widget-card__user-info">
                  <div className="mb-3">
                    {image || user.photoURL ? (
                      <img
                        className="profile-picture avatar-xl mb-2"
                        src={image}
                        alt=""
                      />
                    ) : (
                      <Avatar
                        name={user.displayName}
                        size={130}
                        round
                        style={{ outline: "4px solid white" }}
                      />
                    )}
                  </div>
                  <form>
                    {!isSelected ? (
                      <div className="">
                        <label htmlFor="upload-single-file">
                          <Button
                            className="btn-rounded btn-sm btn-info mt-2"
                            as="span"
                          >
                            <div className="flex flex-middle">
                              <i className="i-Share-on-Cloud"> </i>
                              <span className="text-8">Choose File</span>
                            </div>
                          </Button>
                        </label>
                        <input
                          className="d-none"
                          onChange={(e) => handleFileSelect(e)}
                          accept="image/*"
                          id="upload-single-file"
                          type="file"
                        />
                      </div>
                    ) : (
                      <div>
                        <Button
                          onClick={handleSave}
                          disabled={loading}
                          variant="success"
                          type="submit"
                          size="sm"
                        >
                          {loading && (
                            <Spinner
                              as="span"
                              variant="light"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              animation="border"
                              className="mr-2"
                            />
                          )}
                          Submit
                        </Button>

                        <button
                          onClick={handleCancel}
                          className="btn btn-sm btn-warning ml-2"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </form>
                  <p className="text-30 text-white">{user.displayName}</p>
                  <p className="text-white m-0">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-header">
                  {" "}
                  <i className="i-Administrator mr-1"></i>
                  <strong>Account Information</strong>
                </div>
                <div className="row">
                  <div className="col-lg-6 mt-4">
                    <div className="row">
                      <div className="col-lg-5">
                        <div className="form-group">
                          <p className="text-14 ml-4 font-weight-bold ">
                            Name:
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="form-group">
                          <p className="text-14 ">{teacher.teacherName}</p>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="form-group">
                          <p className="text-14 ml-4 font-weight-bold ">
                            Date of Birth:
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="form-group">
                          <p className="text-14 ">{teacher.birthDate}</p>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        {" "}
                        <div className="form-group">
                          <p className="text-14 ml-4 font-weight-bold ">
                            Gender:
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        {" "}
                        <div className="form-group">
                          <p className="text-14">{teacher.gender}</p>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        {" "}
                        <div className="form-group">
                          <p className="text-14 ml-4 font-weight-bold ">
                            Phone:
                          </p>{" "}
                        </div>
                      </div>
                      <div className="col-lg-7">
                        {" "}
                        <div className="form-group">
                          <p className="text-14">{teacher.phone}</p>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        {" "}
                        <div className="form-group">
                          <p className="text-14 ml-4 font-weight-bold ">
                            Email:
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        {" "}
                        <div className="form-group">
                          <p className="text-14">{teacher.email}</p>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        {" "}
                        <div className="form-group">
                          <p className="text-14 ml-4 font-weight-bold ">
                            Position:
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        {" "}
                        <div className="form-group">
                          {user.role === "_teacher" ? "Teacher" : "Admin"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-4">
                    <div className="row">
                      <div className="col-lg-5">
                        {" "}
                        <div className="form-group">
                          <p className="text-14 ml-4 font-weight-bold ">
                            Date Hired:
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        {" "}
                        <div className="form-group">
                          <p className="text-14">
                            {format(teacher.created, "yyyy/MM/dd")}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        {" "}
                        <div className="form-group">
                          <p className="text-14 ml-4 font-weight-bold ">
                            Date of Birth:
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        {" "}
                        <div className="form-group">
                          <p className="text-14 ">{teacher.birthDate}</p>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        {" "}
                        <div className="form-group">
                          <p className="text-14 ml-4 font-weight-bold ">
                            Subjects:
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        {" "}
                        <div className="form-group">
                          <p className="text-14">
                            {teacher.subjects.map((subject, idx) => (
                              <span key={idx}>{subject.label}, </span>
                            ))}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        {" "}
                        <div className="form-group">
                          <p className="text-14 ml-4 font-weight-bold ">
                            Password:
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        {" "}
                        <div className="form-group">
                          <UpdatePassword
                            uid={user.uid}
                            name="Change Password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
