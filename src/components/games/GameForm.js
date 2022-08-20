import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  Input,
  Button,
  UncontrolledTooltip,
  Form,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Row,
  Col,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuillEditor from '../common/QuillEditor';
import { toast } from 'react-toastify';
import Flex from '../common/Flex';
import moment from 'moment';
import * as fileManagerApi from '../../api/fileManger';
import * as urlConfig from '../../api/urlConfig';
import UploadImage from '../common/UploadImage';

const GameForm = ({ handleSubmit, data = null }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [image, setImage] = useState('');
  const [background, setBackground] = useState('');
  const [imageSpin, setImageSpin] = useState('');
  const [turnPerMember, setTurnPerMember] = useState(1);

  const handleClear = () => {
    setContent('');
    setName(data ? data.name : '');
    setStartAt(data ? data.startAt : '');
    setEndAt(data ? data.endAt : '');
    setImage(data ? data.image : '');
    setBackground(data ? data.backgroud : '');
    setImageSpin(data ? data.imageSpin : '');
    setTurnPerMember(data ? data.turnPerMember : 1);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let imageResult = null;
    let backgorundResult = null;
    let imageSpinResult = null;
    if (image instanceof File) imageResult = await fileManagerApi.uploadImage(image);
    if (background instanceof File) backgorundResult = await fileManagerApi.uploadImage(background);
    if (imageSpin instanceof File) imageSpinResult = await fileManagerApi.uploadImage(imageSpin);

    const dataForm = {
      name,
      startAt,
      endAt,
      image: imageResult ? imageResult.imageId : image,
      backgroud: backgorundResult ? backgorundResult.imageId : background,
      imageSpin: imageSpinResult ? imageSpinResult.imageId : imageSpin,
      turnPerMember,
    };
    handleSubmit(dataForm);
    toast(
      <Fragment>
        <h6>Name: {name}</h6>
        <hr />
        <p className="mb-0">{data ? 'Update' : 'Create'} successfully!</p>
      </Fragment>
    );
    handleClear();
  };

  useEffect(() => {
    setIsDisabled(!name || !startAt || !endAt || !image || !background || !imageSpin || !turnPerMember || isNaN(turnPerMember));
  }, [name, startAt, endAt, image, background, imageSpin, turnPerMember]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setBackground(data.backgroud);
      setEndAt(data.endAt);
      setStartAt(data.startAt);
      setImage(data.image);
      setImageSpin(data.imageSpin);
      setTurnPerMember(data.turnPerMember);
    }
  }, [data]);

  return (
    <Fragment>
      <Card tag={Form} onSubmit={handleSubmitForm}>
        <CardHeader className="bg-light">
          <h5 className="mb-0">{data ? 'Update game' : 'New game'}</h5>
        </CardHeader>
        <CardBody className="p-3">
          <Row className="mb-2">
            <Col sm="12">
              <InputGroup>
                <InputGroupAddon addonType="prepend">Game date</InputGroupAddon>
                <Input
                  type="datetime-local"
                  value={moment(startAt).format('YYYY-MM-DDTHH:mm')}
                  onChange={({ target }) => setStartAt(target.value)}
                />
                <Input
                  type="datetime-local"
                  value={moment(endAt).format('YYYY-MM-DDTHH:mm')}
                  onChange={({ target }) => setEndAt(target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="8">
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="4">
              <FormGroup>
                <Label for="turnPerMember">Turn</Label>
                <Input
                  id="turnPerMember"
                  type="text"
                  placeholder="Turn Per Member"
                  value={turnPerMember }
                  onChange={({ target }) => setTurnPerMember(target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          {/* <QuillEditor value={content} onChange={setContent} style={{ height: 300, marginBottom: 80 }} /> */}
          <div className="bg-light px-card py-3">
            <UploadImage
              label="Image"
              imageLink={image && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image}
              setImage={setImage}
            />
            <UploadImage
              label="Background"
              setImage={setBackground}
              imageLink={background && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + background}
            />
            <UploadImage
              label="Image Spin"
              setImage={setImageSpin}
              imageLink={imageSpin && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + imageSpin}
            />
          </div>
        </CardBody>
        <CardFooter tag={Flex} justify="between" className="border-top border-200">
          <Flex align="center">
            <Button color="primary" size="sm" className="px-5 mr-2" disabled={isDisabled} type="submit">
              {data ? 'Update' : 'Create'}
            </Button>
            <Label onClick={handleClear} className="mr-2 btn btn-light btn-sm mb-0 cursor-pointer" id="clear-info">
              <FontAwesomeIcon icon="times" className="fs-1" />
            </Label>
            <UncontrolledTooltip placement="top" target="clear-info">
              Clear Info
            </UncontrolledTooltip>
          </Flex>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

GameForm.propTypes = { recipientOption: PropTypes.object };

GameForm.defaultProps = {
  recipientOption: {
    closeMenuOnSelect: false,
    autoFocus: true,
    isMulti: true,
    isCreatable: true,
  },
};

export default GameForm;
