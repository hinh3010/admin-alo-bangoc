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

const ModalCom = ({ modal, setModal, className,reload, modalContent, type, callbackAdd, callbackUpdate }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState(modalContent.name);
  const [file, setFile] = useState(modalContent.file);
  const [link, setLink] = useState(modalContent.link );
  const [order, setOrder] = useState(modalContent.order);
  const [status, setStatus] = useState(false);
  const toggle = () => {
    setModal(!modal)
    reload(modal)
   }
  const { id } = useParams();
  console.log(`modalContent`, modalContent)
  console.log(`type`, type)

  useEffect(() => {
      handleClear();
  }, [modalContent]);

  // useEffect(() => {
  //   if(type===0){
  //     setName('');
  //     setFile('');
  //     setOrder(0);
  //     setLink('');
  //     setStatus(false);
  //   }
  //   else{
  //     handleClear();
  //   }
  // }, []);

  const handleClear = () => {
    setName(modalContent &&type===1 ? modalContent.name : '');
    setFile(modalContent &&type===1 ? modalContent.file : '');
    setOrder(modalContent && type===1 ? modalContent.order : 0);
    setLink(modalContent && type===1 ? modalContent.link : '');
    setStatus(modalContent &&type===1 ? modalContent.status : false);
  };

  const onSubmit = async e => {
    e.preventDefault();
    let imageThumlResult = null;
    if (file instanceof File) imageThumlResult = await fileManagerApi.uploadImage(file);
    const dataForm = {
      name,
      file:imageThumlResult?.imageId,
      link,
      order,
      status
    };
    if(type===0){
      const resp = await systemApi.createCompanion(dataForm)
      if(resp){
        toast(
          <Fragment>
            <hr />
            <p className="mb-0">Thêm mới thành công!</p>
          </Fragment>
        );
      }
    }
    else if(type===1){
      const resp = await systemApi.updateCompanion(modalContent?._id,dataForm)
      if(resp){
        toast(
          <Fragment>
            <hr />
            <p className="mb-0">Cập nhật thành công!</p>
          </Fragment>
        );
      }
    }
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
        <ModalHeader>Nhà đồng hành</ModalHeader>
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
                      onChange={({ target }) => setName(target.value)}
                      name="name"
                      id="name"
                      placeholder="Name"
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="link">Link</Label>
                    <Input
                      type="text"
                      value={link}
                      onChange={({ target }) => setLink(target.value)}
                      name="name"
                      id="name"
                      placeholder="Link"
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="order">Thứ tự</Label>
                    <Input
                      type="number"
                      value={order}
                      onChange={({ target }) => setOrder(target.value)}
                      name="name"
                      id="name"
                      placeholder="Thứ tự"
                    />
                  </FormGroup>
                </Col>

                <Col sm="12">
                  <FormGroup>
                    <CustomInput
                      type="checkbox"
                      id="customCheck1"
                      label="Kích hoạt"
                      className="mb-0"
                      checked={status}
                       onChange={(e) => setStatus(e.target.checked)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col sm="12">
                  <UploadImage
                    label="Chọn ảnh"
                    imageLink={file && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + file}
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

export default ModalCom;
