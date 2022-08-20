import React, { createRef, Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, CardGroup } from 'reactstrap';
import * as fileManagerApi from '../../api/fileManger';
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

const BannerAdd = () => {
  const history = useHistory();
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState('');
  const [order, setOrder] = useState('');
  const [position, setPosition] = useState('');
  const [imageError, setImageError] = useState('');
  const [positionError, setPositionError] = useState('Position is required !');
  const [positionList, setPositionList] = useState([]);
  const [suggets, setSuggets] = useState('');
  const [orderError, setOrderError] = useState('');
  const [suggetList, setSuggetList] = useState([]);
  const [loadingPosition, setLoadingPosition] = useState(true);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (id) {
      setPositionError('');
      getBannerDetail();
    } else {
      resetData();
      setLoading(false);
      setLoadingPosition(false);
    }
    getPositionList();
  }, [id]);

  const handleDrop = acceptedFiles => {
    acceptedFiles.map(file => {
      uploadFile(file);
    });
  };

  const resetData = () => {
    setLoading(true);
    setPosition('')
    setItems('');
    setOrder('');
  };

  const handleChangePosition = value => {
    const index = positionType.findIndex(item => item.value === value.value);
    setSuggets(suggetList[index].size);
    setPosition(value);
    console.log(value);
    setPositionError('');
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

  const getPositionList = async () => {
    setLoading(true);
    const token = getToken();
    const resp = await axios({
      method: 'GET',
      url: `${urlConfig.POSITION}?limit=1000000&offset=0`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    setPositionList(resp.data.data);
    setSuggetList(resp.data.data.map(item => { return { size: item.suggests } }))
    setLoading(false);
  }

  const createBanner = () => {
    axios({
      method: 'POST',
      url: `${urlConfig.BANNER}`,
      data: {
        "imageId": items,
        "order": order,
        "position": position.value,
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
      history.push('/banner');
    })
  }

  const getBannerDetail = () => {
    setLoadingPosition(true);
    setLoading(true);
    axios({
      method: 'GET',
      url: `${urlConfig.BANNER}/${id}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then(function (response) {
      console.log(response.data.data);
      setItems(response.data.data.imageId);
      setOrder(response.data.data.order);
      setPosition({ value: response.data.data.position._id, label: response.data.data.position.position });
      setSuggets(response.data.data.position.suggests);
      setLoading(false);
      setLoadingPosition(false);
    })
  }

  const updateBanner = () => {
    axios({
      method: 'PATCH',
      url: `${urlConfig.BANNER}/${id}`,
      data: {
        "order": order,
        "imageId": items,
        "position": position.value,
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
      history.push('/banner');
      console.log(response);
    })
  }

  const OnSubmit = () => {
    if (id) {
      updateBanner();
    }
    else {
      createBanner();
    }

  };

  const deleteItemImage = () => {
    setItems('');
  };

  const setDisabled = () => {
    if (order !== '' && items !== '' && position !== '') {
      return false;
    }
    else if (order === '' || items === '' || position === '') {
      return true;
    }
  }

  const positionType = positionList.map((item) => {
    return { value: item._id, label: item.position }
  })

  console.log(positionType);

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
          <h4 className="mb-0">{id ? 'Update' : 'Create'} Banner</h4>
        </CardHeader>
        <CardBody>
          {false ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(OnSubmit)}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Order: </Label>
                    <div>
                      <Input
                        autoComplete='off'
                        value={order}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter order"
                        onChange={(event) => {
                          const { value } = event.target;
                          const reg = /^-?\d*(\.\d*)?$/;
                          if ((!isNaN(value) && reg.test(value))) {
                            setOrder(value);
                            setOrderError('')
                          }
                          if (value === '' || (isNaN(value) && !reg.test(value))) {
                            setOrderError('Order is required !');
                          }
                        }}
                        className={classNames({ 'border-danger': errors.name })}
                      />
                    </div>
                    <span className="text-danger fs--1">{orderError}</span>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mg-bottom-20">
                <Col md={6}>
                  {/* Input Tag */}
                  <Label for="title">Title :</Label>
                  <Input
                    autoComplete='off'
                    value={title}
                    type="text"
                    name="title"
                    id="title"
                    onChange={(event) => {
                      const { value } = event.target;
                      setTitle(value)
                    }}
                  />
                </Col>
              </Row>
              <Row className="mg-bottom-20">
                <Col md={6}>
                  {/* Input Tag */}
                  <Label for="position">Position:</Label>
                  <Row style={{ marginLeft: '0px' }}>
                    {loadingPosition === false ? <Select
                      name="position"
                      defaultValue={position}
                      options={positionType}
                      onChange={handleChangePosition}
                      className="basic-multi-select basic-multi-select-fix"
                      classNamePrefix="select"
                    /> : ''}
                    <p className="text-danger">{positionError}</p>
                  </Row>
                </Col>
              </Row>


              <Row className="mg-bottom-20">
                <Col md={6}>
                  {/* Input Tag */}
                  <Label for="position">Suggest size :</Label>
                  <Input
                    autoComplete='off'
                    value={suggets}
                    type="text"
                    name="name"
                    id="name"
                    onChange={(event) => {
                      const { value } = event.target;
                      setSuggets(value)
                    }}
                  />
                </Col>
              </Row>

              <Row className="mg-bottom-20">
                <Col md={6}>
                  {/* Input Tag */}
                  <Label for="link">Link :</Label>
                  <Input
                    role="presentation"
                    autoComplete='off'
                    value={link}
                    type="text"
                    name="link"
                    id="link"
                    onChange={(event) => {
                      const { value } = event.target;
                      setLink(value)
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label for="items">Select Banner Image</Label>
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



              <Row>
                <Col md={1}>
                  <Button disabled={setDisabled()} type="submit" color="primary">
                    {id ? 'Update' : 'Create'}
                  </Button>
                </Col>
                <Col md={1}>
                  <Button className="ml-5" color="secondary" onClick={() => history.push('/banner')}>
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

export default BannerAdd;
