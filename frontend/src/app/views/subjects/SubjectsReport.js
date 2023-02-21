import React, { useContext, useState, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container } from "react-bootstrap";
import { Breadcrumb } from "@gull";
import Select from "react-select";
import ExcelReport from "./components/ExcelReport";
import PdfReport from "./components/PdfReport";
const SubjectsReport = () => {
  const { subjects, classroomSlots, dispatch, token } = useContext(AppContext);

  const [selected, setSelected] = useState("");
  const [excel, setExcel] = useState(false);
  const [pdf, setPdf] = useState(false);
  const handleExcel = () => {
    setExcel(true);
    setPdf(false);
  };
  const handlePdf = () => {
    setExcel(false);
    setPdf(true);
  };
  const options = subjects.map((subject) => {
    return {
      value: subject.id,
      label: subject.subjectName,
    };
  });
  const handleChange = (option) => {
    setSelected(option);
  };
  console.log(classroomSlots);
  const classroomSlot = classroomSlots.filter(
    (slot) => slot.subject.value === selected.value
  );
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Subject Report" },
        ]}
      />

      <Container>
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <div className="ul-widget__head border-0 mb-2">
            <div className="form-row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Choose a Subject</label>
                  <Select
                    options={options}
                    value={selected}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-2 mt-4">
                <div className="btn-group  ml-1">
                  <Button
                    disabled={!selected}
                    className={"mr-2 btn btn-info px-3 py-1 "}
                    onClick={handlePdf}
                  >
                    PDF
                  </Button>
                  <Button
                    disabled={!selected}
                    className={"btn btn-success px-3 py-1"}
                    onClick={handleExcel}
                  >
                    Excel
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {excel && <ExcelReport classroomSlot={classroomSlot} />}
          {pdf && <PdfReport subjectId={selected.value} />}
        </Col>
      </Container>
    </Fragment>
  );
};

export default SubjectsReport;
