import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './style.scss'
import React, { Component } from 'react';

export const ModalConfirm = (title, message, handleOk, className) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className="react-confirm-alert">
                    <div className="react-confirm-alert-body">
                        <h2>{title}</h2>
                        {message}
                        <div className="custom-button-group">
                            <button onClick={() => { handleOk(); onClose() }} type="button" class="btn btn-primary">Đồng ý</button>
                            <button onClick={onClose} type="button" class="btn btn-secondary">Hủy</button>
                        </div>
                    </div>
                </div>
            );
        },
        overlayClassName: className ? className : 'default-cusotm-confirm'
    });
};

