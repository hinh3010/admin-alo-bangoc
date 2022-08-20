import React, { useEffect, useRef, useState } from 'react';
import { Form, FormGroup, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

const ModalChangePassword = ({ currentRow, showModal, setShowModal, isResetPass }) => {
    const [olaPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');

    useEffect(() => {
        console.log(document.getElementsByClassName('form-group'))
        console.log(olaPass)
    }, [])


    return (
        <div>
            <Modal
                isOpen={showModal}
                backdrop={false}
                centered
                fullscreen="md"
                toggle={() => setShowModal(false)}
                onExit={() => setShowModal(false)}
                className="custom-modal-password"
            >
                <ModalHeader toggle={() => setShowModal(false)}>
                    {isResetPass ? 'Reset Password' : 'Change password'}
                </ModalHeader>
                <ModalBody>
                    {/* Reset Pass */}
                    {
                        isResetPass && (
                            <div className="modal-body">
                                <div className="col-md-12">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="text-center">

                                                <p>If you have forgotten your password you can reset it here.</p>
                                                <div className="panel-body">
                                                    <fieldset>
                                                        <div className="form-group">
                                                            <input className="form-control input-lg" placeholder="E-mail Address" name="email" type="email" />
                                                        </div>
                                                        <input className="btn btn-lg btn-primary btn-block" value="Send My Password" type="submit" />
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }


                    {/* Change Password */}
                    {
                        !isResetPass && (
                            <div className="modal-body">
                                <div className="col-md-12">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="text-center">
                                                <p>Đổi mật khẩu thường xuyên tăng khả năng bảo mật.</p>
                                                <div className="panel-body">
                                                    <fieldset>
                                                        <Form>
                                                            <div className="tinhnx-form-group">
                                                                <Input className="form-tinhnx input-lg" placeholder="Mật khẩu cũ" value={olaPass}
                                                                    type="password" autoComplete='off'
                                                                    onChange={(event) => {
                                                                        const { value } = event.target;
                                                                        setOldPass(value)
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="tinhnx-form-group">
                                                                <Input className="form-tinhnx input-lg" placeholder="Mật khẩu mới" value={newPass} type="password"
                                                                    autoComplete='off'
                                                                    onChange={(event) => {
                                                                        const { value } = event.target;
                                                                        setNewPass(value)
                                                                    }}
                                                                />
                                                            </div>
                                                            <button className="btn btn-primary btn-block" onClick={() => setShowModal(false)}>Đổi mật khẩu</button>
                                                        </Form>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalChangePassword;