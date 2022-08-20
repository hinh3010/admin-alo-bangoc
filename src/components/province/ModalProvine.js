import React, { useState, useEffect, Fragment } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  ModalFooter,
  CustomInput,
  UncontrolledTooltip
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import * as gamesAPI from '../../api/games';
import * as urlConfig from '../../api/urlConfig';
import * as fileManagerApi from '../../api/fileManger';
import { toast } from 'react-toastify';
import UploadImage from '../common/UploadImage';
import * as systemApi from '../../api/system';

const ModalProvine = ({ modal, setModal, className, reload, modalContent, type, callbackAdd, callbackUpdate }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState(modalContent.name);
  const [province_icon, setFile] = useState(modalContent.province_icon);
  const [pageId, setPageId] = useState(modalContent._id);
  const [status, setStatus] = useState(false);
  const toggle = () => {
    setModal(!modal)
    reload(modal)
  }
  const { id } = useParams();
  console.log(`modalContent`, modalContent)

  useEffect(() => {
    handleClear()
  }, [modalContent]);



  const handleClear = () => {
    setName(modalContent ? modalContent.name : '');
    setFile(modalContent ? modalContent.province_icon : '');
    setPageId(modalContent ? modalContent.pageId : '');
  };

  const onSubmit = async e => {
    console.log(`pageId`, pageId)

    e.preventDefault();
    let imageThumlResult = null;
    if (province_icon instanceof File) imageThumlResult = await fileManagerApi.uploadImage(province_icon);
    const dataForm = {
      icon: imageThumlResult?.imageId,
      pageId: pageId
    };
    const resp = await systemApi.changeIconProvince(modalContent?._id, dataForm)
    if (resp) {
      toast(
        <Fragment>
          <hr />
          <p className="mb-0">Cập nhật thành công!</p>
        </Fragment>
      );
    }
    reload()
    toggle()
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className={`mt-6 ${className ? className : ''}`}
      contentClassName="border-0"
      modalClassName="theme-modal"
      size="sx"
    >
      <Form onSubmit={onSubmit}>
        <ModalHeader>Tỉnh</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={'12'} style={{ borderRight: modalContent ? '1px solid gray' : '' }}>
              <Row>
                <Col sm="12">
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      value={name}
                      name="name"
                      id="name"
                      placeholder="Name"
                    />
                  </FormGroup>
                </Col>

              </Row>

              <Row>
                <Col sm="12">
                  <FormGroup>
                    <Label for="pageId">Page ID</Label>
                    <Input
                      type="text"
                      value={pageId}
                      name="pageId"
                      id="pageId"
                      placeholder="Page ID"
                      onChange={(e) => setPageId(e.target.value)}
                    />
                  </FormGroup>
                </Col>

              </Row>

              <Row>
                <Col sm="12">
                  <UploadImage
                    label="Chọn ảnh"
                    imageLink={province_icon && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + modalContent.province_icon}
                    setImage={setFile}
                  />
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
          <Button onClick={toggle}>Close</Button>
          <Button color="primary" disabled={isDisabled} type="submit">
            Save changes
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalProvine;
