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
                    Chi tiết page
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