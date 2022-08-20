import React, { Component } from 'react';
import { Button, CardImg, Col, Container, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
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
                className="custom-modal-detail"
            >
                <ModalHeader toggle={() => setShowModal(false)}>
                    Chi tiết user
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col sm={4}>
                                <CardImg
                                    alt="Card image cap"
                                    src="https://picsum.photos/318/180"
                                    top
                                    width="100%"
                                    height="100%"
                                />
                            </Col>
                            <Col sm={8}>
                                <Row>
                                    <Col className='label'>Tên: </Col> &nbsp;
                                    <Col>{currentRow.first_name} {currentRow.last_name} </Col>
                                </Row>
                                <Row>
                                    <Col className='label'>Ngày đăng ký: </Col>&nbsp;
                                    <Col>{moment(currentRow.created_at).format('DD-MM-YYYY')} </Col>
                                </Row>
                                <Row>
                                    <Col className='label'>Số bạn bè: </Col>&nbsp;
                                    <Col>1234 </Col>
                                </Row>
                                <Row>
                                    <Col className='label'>Số người theo dõi: </Col>&nbsp;
                                    <Col>1234 </Col>
                                </Row>
                                <Row>
                                    <Col className='label'>Số bài viết: </Col>&nbsp;
                                    <Col>1234 </Col>
                                </Row>
                            </Col>

                        </Row>
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