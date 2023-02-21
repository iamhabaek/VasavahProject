import React, { useState, Fragment } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { classList } from "@utils";
import { format } from "date-fns";
import { multipleApplySlot } from "app/reducers/actions/ClassroomActions";
const basicFormSchema = yup.object().shape({
  selectedSlots: yup.array().required("Please select at least one schedule"),
});
const ScheduleSuggestionModal = ({
  handleClose,
  token,
  dispatch,
  show,
  available,
  handleShowCreateSlot,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState(available);
  const handleSubmit = async (values) => {
    console.log(values);
    const filtered = available.filter((slot) =>
      values.selectedSlots.includes(slot.id)
    );
    setLoading(true);
    await multipleApplySlot(filtered, token)(dispatch);
    handleClose();
    handleShowCreateSlot();
    setLoading(false);
  };

  console.log(available);
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} {...props}>
        <Formik
          initialValues={{ selectedSlots: [] }}
          validationSchema={basicFormSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            return (
              <form
                className="needs-validation"
                onSubmit={handleSubmit}
                noValidate
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    <i></i>Available schedules in selected Date,Days and Time
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* <span>
                    Please fill all the required (
                    <span className="text-danger">*</span>) fields
                  </span> */}
                  {available && (
                    <div className="form-row mt-2">
                      <div className="form-group col-md-12">
                        <div
                          className={classList({
                            "mx-0": true,
                            "valid-field": !errors.title && touched.title,
                            "invalid-field": errors.title && touched.title,
                          })}
                        >
                          <div>
                            {available.map((item) => (
                              <div className="input-group">
                                <Field
                                  key={item.id}
                                  type="checkbox"
                                  name="selectedSlots"
                                  value={item.id}
                                  checked={values.selectedSlots.includes(
                                    item.id
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFieldValue("selectedSlots", [
                                        ...values.selectedSlots,
                                        item.id,
                                      ]);
                                    } else {
                                      setFieldValue(
                                        "selectedSlots",
                                        values.selectedSlots.filter(
                                          (i) => i !== item.id
                                        )
                                      );
                                    }
                                  }}
                                />
                                <label
                                  htmlFor="title"
                                  className="ml-2 font-weight-bold"
                                >
                                  <span>{`${format(
                                    new Date(0, 0, 0, item.startTime),
                                    "h:mm aa"
                                  )} - ${format(
                                    new Date(0, 0, 0, item.endTime),
                                    "h:mm aa"
                                  )}`}</span>
                                </label>
                              </div>
                            ))}
                            {errors.selectedSlots && touched.selectedSlots ? (
                              <div>{errors.items}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button disabled={loading} variant="info" type="submit">
                    {loading && (
                      <Spinner
                        as="span"
                        variant="light"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        animation="border"
                        className="mr-1"
                      />
                    )}
                    Submit
                  </Button>
                </Modal.Footer>
              </form>
            );
          }}
        </Formik>
      </Modal>
    </Fragment>
  );
};

export default ScheduleSuggestionModal;

