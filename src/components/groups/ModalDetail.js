import React, { Component } from 'react';
import { Button, CardImg, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import moment from 'moment'

const ModalDetail = ({ currentRow, showModal, setShowModal }) => {
    console.log(currentRow)
    return (
        <div>
            <Modal
                isOpen={showModal}
                backdrop={false}
                centered
                fullscreen="md"
                toggle={() => setShowModal(false)}
                onExit={() => setShowModal(false)}
                className="custom-modal-detail-group"
            >
                <ModalHeader toggle={() => setShowModal(false)}>
                    Chi tiết nhóm
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <Form>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={4}>
                                    Tên nhóm
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="with a placeholder"
                                        type="text"
                                        value={currentRow.name}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm={4}>
                                    Mô tả
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="with a placeholder"
                                        type="text"
                                        value={currentRow.description}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="createdBy" sm={4}>
                                    Người tạo
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        id="createdBy"
                                        name="createdBy"
                                        placeholder="with a placeholder"
                                        type="text"
                                        value={currentRow.creator}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="createDate" sm={4}>
                                    Ngày tạo
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        id="createDate"
                                        name="createDate"
                                        placeholder="with a placeholder"
                                        type="date"
                                        // value={currentRow.created_at}
                                        defaultValue={new Date(currentRow.created_at).toISOString().substr(0, 10)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="totalUser" sm={4}>
                                    Số lượng user
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        id="totalUser"
                                        name="totalUser"
                                        placeholder="with a placeholder"
                                        type="number"
                                        value={currentRow.totalUser ? currentRow.totalUser : 100}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="totalPost" sm={4}>
                                    Số lượng bài post
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        id="totalPost"
                                        name="totalPost"
                                        placeholder="with a placeholder"
                                        type="number"
                                        value={currentRow.totalPost ? currentRow.totalPost : 100}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="nearest " sm={4}>
                                    Hành động gần nhất
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        id="nearest"
                                        name="nearest"
                                        placeholder="with a placeholder"
                                        type="text"
                                        value={currentRow.nearest}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="status " sm={4}>
                                    Trạng thái
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        id="status"
                                        name="status"
                                        type="select"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            {/* <FormGroup row>
                                <Label
                                    for="examplePassword"
                                    sm={4}
                                >
                                    Password
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        id="examplePassword"
                                        name="password"
                                        placeholder="password placeholder"
                                        type="password"
                                    />
                                </Col>
                            </FormGroup> */}
                            {/* <FormGroup row>
                                <Label for="exampleSelect" sm={4} >
                                    Select
                                </Label>
                                <Col sm={8}>
                                    <Input id="exampleSelect" name="select" type="select">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </Input>
                                </Col>
                            </FormGroup> */}
                            {/* <FormGroup row>
                                <Label for="exampleSelectMulti" sm={4} >
                                    Select Multiple
                                </Label>
                                <Col sm={8}>
                                    <Input id="exampleSelectMulti" multiple name="selectMulti" type="select" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </Input>
                                </Col>
                            </FormGroup> */}
                            {/* <FormGroup row>
                                <Label
                                    for="exampleText"
                                    sm={4}
                                >
                                    Text Area
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        id="exampleText"
                                        name="text"
                                        type="textarea"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="exampleFile"
                                    sm={4}
                                >
                                    File
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        id="exampleFile"
                                        name="file"
                                        type="file"
                                    />
                                    <FormText>
                                        This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
                                    </FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup
                                row
                                tag="fieldset"
                            >
                                <legend className="col-form-label col-sm-2">
                                    Radio Buttons
                                </legend>
                                <Col sm={8}>
                                    <FormGroup check>
                                        <Input
                                            name="radio2"
                                            type="radio"
                                        />
                                        {' '}
                                        <Label check>
                                            Option one is this and that—be sure to include why it's great
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input
                                            name="radio2"
                                            type="radio"
                                        />
                                        {' '}
                                        <Label check>
                                            Option two can be something else and selecting it will deselect option one
                                        </Label>
                                    </FormGroup>
                                    <FormGroup
                                        check
                                        disabled
                                    >
                                        <Input
                                            disabled
                                            name="radio2"
                                            type="radio"
                                        />
                                        {' '}
                                        <Label check>
                                            Option three is disabled
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="checkbox2"
                                    sm={4}
                                >
                                    Checkbox
                                </Label>
                                <Col
                                    sm={{
                                        size: 10
                                    }}
                                >
                                    <FormGroup check>
                                        <Input
                                            id="checkbox2"
                                            type="checkbox"
                                        />
                                        {' '}
                                        <Label check>
                                            Check me out
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup
                                check
                                row
                            >
                                <Col
                                    sm={{
                                        offset: 2,
                                        size: 10
                                    }}
                                >
                                    <Button>
                                        Submit
                                    </Button>
                                </Col>
                            </FormGroup> */}
                        </Form>
                    </Container>

                </ModalBody>
                <ModalFooter>
                    {/* {' '}  */}
                    <Button onClick={() => setShowModal(false)} color="secondary">
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalDetail;