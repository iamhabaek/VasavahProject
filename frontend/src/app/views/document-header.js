import React, { Component } from 'react';
import { Col, FormGroup, Row } from 'react-bootstrap';

class DocHeader extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm="3" xs="3">
                        <FormGroup className=" mb-0">
                            <img src="../../vasavah-favicon.png" className="img-fluid document-logo" />
                        </FormGroup>
                    </Col>
                    <Col sm="6" xs="6">
                        <FormGroup className="text-center mb-0 py-3">
                            <h4 className="mb-0 document-company-xs">Golden ToPPer</h4>
                            <p className="font-weight-semibold text-sm document-iso-xs">ISO 9001:2008 - Quality Management</p>
                        </FormGroup>
                    </Col>
                    <Col sm="3" xs="3">
                        <FormGroup className="text-right mb-0 document-form-id-xs">
                            <p className="mb-1 text-sm">Form ID:</p>
                            <h5 className="mb-0 text-sm font-weight-bold">AAA-BBB-001</h5>
                            <p className="mb-1 text-sm">Ver:</p>
                            <h5 className="mb-0 text-sm font-weight-bold">1.0</h5>
                        </FormGroup>
                    </Col>
                    <Col xl="12">
                        <hr className="mt-0 mb-3" />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DocHeader;
