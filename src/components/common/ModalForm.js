import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import React, { Fragment, useState } from 'react';
import {
  Form,
  Label,
  Input,
  FormGroup,
  Col,
  Row,
  Modal,
  ModalHeader,
  Button,
  ModalFooter,
  ModalBody,
  UncontrolledTooltip
} from 'reactstrap';
import * as systemApi from '../../api/system';



const ModalFrom = ({data, reload, className, placement, onSubmit, modal, setModal }) => {

  const [collapseOne, collapseOneOpen] = useState(true);
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  console.log(`modal`, modal)
  const toggle = () => {
    setModal(!modal);
    // reload(modal);
    setContent('')
  };

  const handleClear = () => {
    // setName(modalContent ? modalContent.name : '');
    // setFile(modalContent  ? modalContent.province_icon : '');
  };

  const handleSubmit =(e) =>{
    e.preventDefault()
    onSubmit({data,content})
    toggle()
  }

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      contentClassName="border-0"
      modalClassName="theme-modal"
      s
      size="sx"
      style={{ width: '100%' }}
    >
      <Form onSubmit={handleSubmit}>
        <ModalHeader>Lí do</ModalHeader>
        <ModalBody style={{ width: '100%' }}>
          <Row>
            <Col style={{ borderRight: true ? '1px solid gray' : '' }}>
              <Row>
                <Col sm="12">
                  <FormGroup>
                    <Input
                     type="textarea"
                      value={content}
                      onChange={(e)=>setContent(e.target.value)}
                      placeholder="Nội dung"
                      Row={4}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Label onClick={handleClear} className="mr-2 btn btn-light btn-sm mb-0 cursor-pointer" id="clear-info">
            <FontAwesomeIcon icon="times" className="fs-1" />
          </Label>
          <UncontrolledTooltip placement="top" target="clear-info">
            Clear Info
          </UncontrolledTooltip>
          <Button onClick={toggle}>đóng</Button>
          <Button color="primary" disabled={isDisabled} type="submit">
            Gửi đi
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

ModalFrom.propTypes = {
  id: PropTypes.string,
  placement: PropTypes.string
};

ModalFrom.defaultProps = { placement: 'top' };

export default ModalFrom;
