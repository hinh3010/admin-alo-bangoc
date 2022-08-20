import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  Form,
  Media,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuillEditor from '../common/QuillEditor';
import { toast } from 'react-toastify';
import Datetime from 'react-datetime';
import { isIterableArray } from '../../helpers/utils';
import useFakeFetch from '../../hooks/useFakeFetch';
import Flex from '../common/Flex';
import rawEmailAdresses from '../../data/email/emailAddresses';
import Select from '../common/Select';
import ComposeAttachment from '../email/ComposeAttachment';
import Avatar from '../common/Avatar';
import FalconDropzone from '../common/FalconDropzone';
import avatarImg from '../../assets/img/team/avatar.png';
import cloudUpload from '../../assets/img/icons/cloud-upload.svg';
import moment from 'moment';

const ImageDropzone = ({ title, content, typeImage, placehoder, value, getImage }) => {
  const [avatar, setAvatar] = useState([{ src: avatarImg }]);

  return (
    <Media className="flex-center pb-3 d-block d-md-flex text-center mb-2">
      {/* <Avatar size="4xl" className="mb-2" src={isIterableArray(avatar) ? avatar[0].base64 || avatar[0].src : ''} />
      <Media body className="ml-md-4">
        <FalconDropzone
          files={avatar}
          onChange={(files) => {
            setImage(files);
            setAvatar(files);
          }}
          multiple={false}
          accept="image/*"
          placeholder={
            <Fragment>
              <Media className=" fs-0 mx-auto d-inline-flex align-items-center">
                <img src={cloudUpload} alt="" width={25} className="mr-2" />
                <Media>
                  <p className="fs-0 mb-0 text-700">{title}</p>
                </Media>
              </Media>
              <p className="mb-0 w-75 mx-auto text-500">{content}</p>
            </Fragment>
          }
        />
      </Media> */}
      <Input className="form-control border-0 outline-none px-card" value={value} onChange={({ target }) => getImage(target.value, typeImage)} type="text" placeholder={placehoder} required />
      <Flex align="center">
        <Label id="delete" className="mr-2 btn btn-light btn-sm mb-0 cursor-pointer">
          <FontAwesomeIcon icon="trash" />
        </Label>
        <UncontrolledTooltip placement="top" target="delete">
          Delete this image
        </UncontrolledTooltip>
      </Flex>
    </Media>
  );
};

const GameForm = ({ handleSubmit, data = null }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [image, setImage] = useState('');
  const [background, setBackground] = useState('');

  const handleClear = () => {
    setContent('');
    setName(data ? data.name : '');
    setStartAt(data ? data.startAt : '');
    setEndAt(data ? data.endAt : '');
    setImage(data ? data.image : '');
    setBackground(data ? data.backgroud : '');
  };

  const getImage = (image, typeImage) => {
    if(typeImage === 'image') setImage(image);
    if(typeImage === 'background') setBackground(image);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const dataForm = {
      name,
      startAt,
      endAt,
      image,
      backgroud: background
    };
    handleSubmit(dataForm);
    toast(
      <Fragment>
        <h6>Name: {name}</h6>
        <hr />
        <p className="mb-0">Update successfully!</p>
      </Fragment>
    );
    // handleClear();
  };

  useEffect(() => {
    setIsDisabled(!name || !startAt || !endAt || !image || !background);
  }, [name, startAt, endAt, image, background]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setBackground(data.backgroud);
      setEndAt(data.endAt);
      setStartAt(data.startAt);
      setImage(data.image);
    }
  }, [data]);

  return (
    <Fragment>
      <Card tag={Form} onSubmit={handleSubmitForm}>
        <CardHeader className="bg-light">
          <h5 className="mb-0">New game</h5>
        </CardHeader>
        <CardBody className="p-0">
          <InputGroup>
            <InputGroupAddon addonType="prepend">Game date</InputGroupAddon>
            <Input type="datetime-local" value={moment(startAt).format("YYYY-MM-DDTHH:mm")} onChange={({ target }) => setStartAt(target.value)} />
            <Input type="datetime-local" value={moment(endAt).format("YYYY-MM-DDTHH:mm")} onChange={({ target }) => setEndAt(target.value)} />
          </InputGroup>
          <Input
            className="form-control border-0 outline-none px-card"
            type="text"
            placeholder="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />
          <QuillEditor value={content} onChange={setContent} style={{ height: 300, marginBottom: 80 }} />
          <div className="bg-light px-card py-3">
            <ImageDropzone
              placehoder="Image"
              typeImage="image"
              getImage={getImage}
              value={image}
              title="Upload your profile picture"
              content="Upload a 300x300 jpg image with a maximum size of 400KB"
            />
            <ImageDropzone
              placehoder="Background"
              typeImage="background"
              getImage={getImage}
              value={background}
              title="Upload your profile picture"
              content="Upload a 300x300 jpg image with a maximum size of 400KB"
            />
          </div>
          {/* {isIterableArray(attachments) && (
            <div className="bg-light px-card py-3">
              <Flex column inline>
                {attachments.map(attachment => (
                  <ComposeAttachment
                    {...attachment}
                    key={attachment.id}
                    handleDetachAttachment={handleDetachAttachment}
                  />
                ))}
              </Flex>
            </div>
          )} */}
        </CardBody>
        <CardFooter tag={Flex} justify="between" className="border-top border-200">
          <Flex align="center">
            <Button color="primary" size="sm" className="px-5 mr-2" disabled={isDisabled} type="submit">
              Send
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
