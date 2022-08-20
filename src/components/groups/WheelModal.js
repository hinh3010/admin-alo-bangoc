import React, { useState, useEffect, Fragment } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  ModalFooter,
  CustomInput,
  Media,
  UncontrolledTooltip,
} from 'reactstrap';
import Background from '../common/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useHistory } from 'react-router-dom';
import users from '../../data/dashboard/users';
import PageHeader from '../common/PageHeader';
import FalconCardHeader from '../common/FalconCardHeader';
import QuillEditor from '../common/QuillEditor';
import Flex from '../common/Flex';
import * as gamesAPI from '../../api/games';
import { toast } from 'react-toastify';

const WheelModal = ({ modal, setModal, className, modalContent, type, callbackAdd, callbackUpdate }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [useName, setUseName] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [remaining, setRemaining] = useState('');
  const [wheelType, setWheelType] = useState('gift');
  const [name, setName] = useState('');
  const [imageThuml, setImageThuml] = useState('');
  const [description, setDescription] = useState('');
  const [urlDetail, setUrlDetail] = useState('');
  const [vouchers, setVouchers] = useState('');
  const toggle = () => setModal(!modal);
  const { id } = useParams();

  useEffect(() => {
    setIsDisabled(!name || (!quantity && wheelType === 'gift') || !imageThuml || !description || !urlDetail);
  }, [quantity, name, imageThuml, description, urlDetail, wheelType]);

  useEffect(() => {
    handleClear();
  }, [modalContent]);

  const handleClear = () => {
    setUseName(modalContent ? modalContent.useName : true);
    setQuantity(modalContent ? modalContent.quantity : '');
    setRemaining(modalContent ? modalContent.remaining : '');
    setWheelType(modalContent ? modalContent.wheel_type : 'gift');
    setName(modalContent ? modalContent.name : '');
    setImageThuml(modalContent ? modalContent.image_thuml : '');
    setDescription(modalContent ? modalContent.desctiption : '');
    setUrlDetail(modalContent ? modalContent.url_detail : '');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const dataForm = {
      quantity: quantity ? quantity : 1,
      wheel_type: wheelType,
      name,
      image_thuml: imageThuml,
      desctiption: description,
      url_detail: urlDetail,
    };
    let wheelId = '';
    if (type === 'update') {
      const newWheel = await gamesAPI.updateWheel(modalContent.game, modalContent.id, dataForm);
      wheelId = newWheel.id;
      callbackUpdate(modalContent.id, newWheel);
    } else {
      const newWheel = await gamesAPI.addWheel(id, dataForm);
      wheelId = newWheel.id;
      callbackAdd(newWheel);
    }
    if (vouchers) {
        const formData = new FormData();
        formData.append("file", vouchers);
        console.log('vouchers__', vouchers)
        const test = await gamesAPI.updateVouchers(wheelId, formData);
        console.log('test___', vouchers)
    }
    toast(
      <Fragment>
        <h6>Name: {name}</h6>
        <hr />
        <p className="mb-0">Update wheel successfully!</p>
      </Fragment>
    );
    toggle();
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className={`mt-6 ${className ? className : ''}`}
      contentClassName="border-0"
      modalClassName="theme-modal"
      size="lg"
    >
      <Form onSubmit={onSubmit}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="8">
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
            <Col sm="4">
              <FormGroup>
                <Label for="useName">Use name?</Label>
                <CustomInput
                  type="select"
                  id="useName"
                  value={useName}
                  onChange={({ target }) => setUseName(target.value)}
                  name="useName"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </CustomInput>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  rows="5"
                  name="description"
                  id="description"
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <FormGroup>
                <Label for="wheelType">Wheel type?</Label>
                <CustomInput
                  type="select"
                  id="wheelType"
                  value={wheelType}
                  onChange={({ target }) => setWheelType(target.value)}
                  name="customSelect"
                  disabled={type === 'update'}
                >
                  <option value="gift">Gift</option>
                  <option value="voucher">Voucher</option>
                </CustomInput>
              </FormGroup>
            </Col>
            {wheelType === 'gift' ? (
              <>
                <Col sm="4">
                  <FormGroup>
                    <Label for="quantity">Quantity</Label>
                    <Input
                      type="text"
                      name="quantity"
                      id="quantity"
                      value={quantity}
                      onChange={({ target }) => setQuantity(target.value)}
                      placeholder="Quantity"
                    />
                  </FormGroup>
                </Col>
                {type === 'update' && (
                  <Col sm="4">
                    <FormGroup>
                      <Label for="remaining">Remaining</Label>
                      <Input
                        disabled={true}
                        type="text"
                        name="remaining"
                        id="remaining"
                        value={remaining}
                        onChange={({ target }) => setRemaining(target.value)}
                        placeholder="Remaining"
                      />
                    </FormGroup>
                  </Col>
                )}
              </>
            ) : (
              <Col sm="8">
                <FormGroup>
                  <Label for="vouchers">Vouchers</Label>
                  <Input
                    type="file"
                    accept=".xlsx, .xls"
                    name="vouchers"
                    id="vouchers"
                    onChange={(e) => setVouchers(e.target.files[0])}
                  />
                </FormGroup>
              </Col>
            )}
          </Row>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="urlDetail">Url detail</Label>
                <Input
                  type="text"
                  name="urlDetail"
                  id="urlDetail"
                  value={urlDetail}
                  onChange={({ target }) => setUrlDetail(target.value)}
                  placeholder="Url detail"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="imageThuml">Image thuml</Label>
                <Media className="flex-center pb-3 d-block d-md-flex text-center mb-2">
                  <Input
                    name="imageThuml"
                    id="imageThuml"
                    className="form-control outline-none px-card"
                    type="text"
                    value={imageThuml}
                    onChange={({ target }) => setImageThuml(target.value)}
                    required
                  />
                  <Flex align="center">
                    <Label
                      id="delete"
                      onClick={() => setImageThuml('')}
                      className="mr-2 btn btn-light btn-sm mb-0 cursor-pointer"
                    >
                      <FontAwesomeIcon icon="trash" />
                    </Label>
                    <UncontrolledTooltip placement="top" target="delete">
                      Delete this image
                    </UncontrolledTooltip>
                  </Flex>
                </Media>
              </FormGroup>
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

export default WheelModal;
