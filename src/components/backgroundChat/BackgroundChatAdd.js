import React, { createRef, Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, CardGroup } from 'reactstrap';
import * as stickerApi from '../../api/sticker';
import * as fileManagerApi from '../../api/fileManger';
import { getListPostCategory } from '../../api/post';
import * as urlConfig from '../../api/urlConfig';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import UploadImage from '../common/UploadImage';
import Loader from '../common/Loader';
import Dropzone from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Styles.css';
import Avatar from '../common/Avatar';
import Select from 'react-select';
import axios from 'axios';
import { getToken } from '../../services/storages/userStorage';

const token = getToken();

const BackgroundChatAdd = () => {
  const history = useHistory();
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState('');
  const [order, setOrder] = useState('');
  const [type, setType] = useState('');
  const [imageError, setImageError] = useState('');
  const [typeError, setTypeError] = useState('Position is required !');
  const [position,setPosition] = useState('');

  useEffect(() => {
    if (id) {
      setTypeError('');
      getBgDetail();
    } else {
      resetData();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleDrop = acceptedFiles => {
    acceptedFiles.map(file => {
      uploadFile(file);
    });
  };

  const resetData = () => {
    setLoading(true);
    setType('')
    setItems('');
    setOrder('');
  };

  const handleChangeType = value => {
    console.log(value);
    setPosition(value);
    setTypeError('');
  };

  const uploadFile = async file => {
    console.log((file.path));
    let imageResult = null;
    if (file instanceof File) imageResult = await fileManagerApi.uploadImage(file);
    if (imageResult) {
      setItems(imageResult.imageId);
    } else {
      setItems(file.path);
    }
    setImageError('');
  };

  const createBackground = () => {
    axios({
      method: 'POST',
      url: `${urlConfig.BACKGROUND_CHAT}`,
      data: {
        "imageId": items,
        "type": type.value,
        "order": order,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then(function (response) {
      toast(
        <Fragment>
          <p className="mb-0">Create successfully!</p>
        </Fragment>
      );
      history.push('/backgroundChat');
      console.log(response);

    })
  }

  const getBgDetail = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${urlConfig.BACKGROUND_CHAT}/${id}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then(function (response) {
      console.log(response);
      setItems(response.data.imageId);
      setOrder(response.data.order);
      setType(valueType.filter(item=>item.value === response.data.type)[0]);
      setLoading(false);
    })
  }

  const updateBackground = ()=>{
    axios({
      method: 'PATCH',
      url: `${urlConfig.BACKGROUND_CHAT}/${id}`,
      data: {
        "imageId": items,
        "type": type.value,
        "order": order,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then(function (response) {
      toast(
        <Fragment>
          <p className="mb-0">Update successfully!</p>
        </Fragment>
      );
      history.push('/backgroundChat');
      console.log(response);
    })
  }

  const OnSubmit = () => {
    if(id){
      updateBackground();
    }
    else{
      createBackground();
    }

  };

  const deleteItemImage = () => {
    setItems('');
  };

  const valueType = [
    { value: 'ALL', label: 'All' },
    { value: 'WEB', label: 'Web' },
    { value: 'APP', label: 'App' },
  ]

  const setDisabled = () => {
    if (order !== '' && items !== '' && position !== '') {
      return false;
    }
    else if (order === '' || items === '' || position === '') {
      return true;
    }
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result);
    const items1 = Array.from(items);
    console.log(items1);
    const [reorderedItem] = items1.splice(result.source.index, 1);
    items1.splice(result.destination.index, 0, reorderedItem);

    setItems(items1);
  }
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">{id ? 'Update' : 'Create'} Background Chat</h4>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(OnSubmit)}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Order</Label>
                    <div>
                      <Input
                        value={order}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter order"
                        innerRef={register({
                          required: 'This is required.',
                        })}
                        onChange={(event) => {
                          const { value } = event.target;
                          const reg = /^-?\d*(\.\d*)?$/;
                          if ((!isNaN(value) && reg.test(value))) {
                            setOrder(value);
                          }
                        }}
                        className={classNames({ 'border-danger': errors.name })}
                      />
                    </div>
                    {errors.name && <span className="text-danger fs--1">{errors.name.message}</span>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label for="items">Select Background Image</Label>
                  <Dropzone onDrop={handleDrop} accept="image/*" minSize={1024} maxSize={3072000}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag'n'drop images, or click to select files</p>
                      </div>
                    )}
                  </Dropzone>
                  <div>
                    <CardGroup>
                      <DragDropContext onDragEnd={handleOnDragEnd} onChange={(event) => { console.log(); }}>
                        <Droppable droppableId="characters">
                          {provided => (
                            <div
                              style={{ display: 'flex', flexWrap: 'wrap' }}
                              className="characters"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >

                              <Draggable key={items} draggableId={items}>
                                {provided => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {items && <Card className="">
                                      <Button
                                        color="danger"
                                        outline
                                        className="btn-close btn-delete-image"
                                        onClick={() => {
                                          deleteItemImage();
                                          setImageError('Image is required !')
                                        }}
                                      />
                                      <Avatar
                                        src={
                                          items
                                            ? items.endsWith('.gif')
                                              ? urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + items
                                              : urlConfig.BASE_URL_FILE_MANAGER +
                                              '/file/get-image?image_id=' +
                                              items
                                            : "null"
                                        }
                                        size="4xl"
                                        className="mg-bottom-5"
                                      />
                                    </Card>}
                                    <p className="text-danger">{imageError}</p>
                                  </div>
                                )}
                              </Draggable>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </CardGroup>
                  </div>
                </Col>
              </Row>

              <Row className="mg-bottom-20">
                <Col md={6}>
                  {/* Input Tag */}
                  <Label for="type">Type:</Label>
                  {loading === false ? <Select
                    name="type"
                    defaultValue={type}
                    options={valueType}
                    onChange={handleChangeType}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  /> : ''}
                  <p className="text-danger">{typeError}</p>
                </Col>
              </Row>

              <Row>
                <Col md={1}>
                  <Button disabled={setDisabled()} type="submit" color="primary">
                    {id ? 'Update' : 'Create'}
                  </Button>
                </Col>
                <Col md={1}>
                  <Button className="ml-5" color="secondary" onClick={() => history.push('/backgroundChat')}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default BackgroundChatAdd;
