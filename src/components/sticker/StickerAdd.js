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

const StickerAdd = () => {
  const [sticker, setSticker] = useState({});
  const history = useHistory();
  const { id } = useParams('');
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [isFree, setisFree] = useState(false);
  const [textFrice, settextFrice] = useState('0');
  const [isDefault, setDefault] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);

  console.log('textFrice', textFrice);
  useEffect(() => {
    if (id) {
      getDetail();
    } else {
      resetData();
    }
    setTimeout(() => {
      setisFree(true)
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    if (!isEmpty(formData) && isSubmit) {
      if (id) {
        updateSticker();
      } else {
        createSticker();
      }
    }
  }, [formData, isSubmit]);

  useEffect(() => {
    getStickerList();
  }, []);

  const handleDrop = acceptedFiles => {
    acceptedFiles.map(file => {
      uploadFile(file);
    });
  };

  const resetData = () => {
    setLoading(true);
    setSticker({});
    setFormData({});
    setImage('');
    setItems([]);
  };

  const getDetail = async () => {
    console.log('RUNNNNNNNN GET DETAIL');
    const hashtagResult = [];
    const cateResult = [];
    const result = await stickerApi.detail(id);
    console.log('RESULT: ', result);
    result.hashtags.forEach(element => {
      const hashtagObject = { value: '', label: '' };
      hashtagObject.value = element;
      hashtagObject.label = element;
      hashtagResult.push(hashtagObject);
    });
    result.categories.forEach(element => {
      const cateObject = { value: '', label: '' };
      cateObject.value = element.id;
      cateObject.label = element.name;
      cateResult.push(cateObject);
    });
    setSelectedHashtags(hashtagResult);
    setSticker(result);
    setItems(result.items);
    setSelectedCategories(cateResult);
    setFormData({ name: result.name, thumbnail: result.thumbnail });
  };

  const updateSticker = async () => {
    console.log(`formData`, formData);
    const result = await stickerApi.update(id, formData);
    toast(
      <Fragment>
        <h6>Name: {result.name}</h6>
        <hr />
        <p className="mb-0">Update successfully!</p>
      </Fragment>
    );
    history.push('/sticker');
  };

  const handleChangeCategories = selectedOptions => {
    if (selectedOptions != null) {
      let cateResult = [];
      selectedOptions.forEach(element => {
        const cateObject = { value: '', label: '' };
        cateObject.value = element.value;
        cateObject.label = element.label;
        cateResult.push(cateObject);
      });
      setSelectedCategories(cateResult);
    }
    if (selectedOptions == null) {
      setSelectedCategories([]);
    }
  };

  const handleChangeHashtags = selectedOptions => {
    if (selectedOptions != null) {
      let hashtagsResult = [];
      selectedOptions.forEach(element => {
        const hashtagsObject = { value: '', label: '' };
        hashtagsObject.value = element.value;
        hashtagsObject.label = element.label;
        hashtagsResult.push(hashtagsObject);
      });
      setSelectedHashtags(hashtagsResult);
    }
    if (selectedOptions == null) {
      setSelectedHashtags([]);
    }
  };

  const uploadFile = async file => {
    let imageResult = null;
    if (file instanceof File) imageResult = await fileManagerApi.uploadImage(file);
    if (imageResult) {
      setItems(items => [...items, imageResult.imageId]);
    } else {
      setItems(items => [...items, file]);
    }
  };

  const OnSubmit = async (data, e) => {
    let cateArray = [];
    let hashtagArray = [];
    let imageResult = null;
    selectedCategories.forEach(value => {
      cateArray.push(value.value);
    });
    selectedHashtags.forEach(value => {
      hashtagArray.push(value.value);
    });
    if (image instanceof File) imageResult = await fileManagerApi.uploadImage(image);
    console.log(`imageResult`, imageResult);
    setFormData({
      ...data,
      thumbnail: imageResult ? imageResult.imageId : formData.thumbnail,
      items: items,
      price: Number(textFrice),
      categories: cateArray,
      hashtags: hashtagArray
    });
    setIsSubmit(true);
  };

  const deleteItemImage = value => {
    items.splice(value, 1);
    setItems([...items]);
  };

  const createSticker = async () => {
    console.log('RUNN CREATE STICKER', formData);
    const result = await stickerApi.create(formData);
    toast(
      <Fragment>
        <h6>Name: {result.name}</h6>
        <hr />
        <p className="mb-0">Create successfully!</p>
      </Fragment>
    );
    history.push('/sticker');
  };

  const hashtags = [
    { value: 'cute lạc lối', label: 'cute lạc lối' },
    { value: 'lạc nhưng lại không thấy lối', label: 'lạc nhưng lại không thấy lối' },
    { value: 'lạc lối ở bắc kinh', label: 'lạc lối ở bắc kinh' }
  ];

  const categoriesOption = categories.map(value => {
    // console.log(`value`, value)
    return { value: value._id, label: value.name };
  });

  const getStickerList = async () => {
    const data = await getListPostCategory(0, 1000);
    console.log('Data: ', data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // console.log('Categories', data.items);
    setCategories(data.items);
  };


  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const move = (source = [], destination = [], droppableSource, droppableDestination) => {
    console.log(`source`, source);
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  function handleOnDragEnd1(result) {
    const { source, destination } = result;
    console.log(`result`, result);
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.index;
    const dInd = +destination.index;

    if (sInd === dInd) {
      const newitems = reorder(items[sInd], source.index, destination.index);
      console.log(`newitems`, newitems);
      const newState = [...newitems];
      newState[sInd] = newitems;
      setItems(newState);
    } else {
      const result = move(items[sInd], items[dInd], source, destination);
      const newState = [...items];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setItems(newState);
    }
  }
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(`result`, result);
    const items1 = Array.from(items);
    const [reorderedItem] = items1.splice(result.source.index, 1);
    items1.splice(result.destination.index, 0, reorderedItem);

    setItems(items1);
  }
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">{id ? 'Update' : 'Create'} sticker</h4>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(OnSubmit)}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Sticker name</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.name : ''}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter sticker name"
                      innerRef={register({
                        required: 'This is required.',
                        minLength: {
                          value: 6,
                          message: 'Minimum six word'
                        }
                      })}
                      className={classNames({ 'border-danger': errors.name })}
                    />
                    {errors.name && <span className="text-danger fs--1">{errors.name.message}</span>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label for="items">Sticker Items</Label>
                  <Dropzone onDrop={handleDrop} accept="image/*" minSize={1024} maxSize={3072000}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag'n'drop images, or click to select files</p>
                      </div>
                    )}
                  </Dropzone>
                  <div>
                    <strong>Items:</strong>
                    <CardGroup>
                      <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="characters">
                          {provided => (
                            <div
                              style={{ display: 'flex', flexWrap: 'wrap' }}
                              className="characters"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {items.map((value, index) => {
                                return (
                                  <Draggable key={value} draggableId={value} index={index}>
                                    {provided => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <Card className="">
                                          <Button
                                            key={index}
                                            color="danger"
                                            outline
                                            className="btn-close btn-delete-image"
                                            onClick={() => deleteItemImage(index)}
                                          />
                                          <Avatar
                                            src={
                                              value
                                                ? value.endsWith('.gif')
                                                  ? urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + value
                                                  : urlConfig.BASE_URL_FILE_MANAGER +
                                                  '/file/get-image?image_id=' +
                                                  value
                                                : null
                                            }
                                            size="4xl"
                                            className="mg-bottom-5"
                                          />
                                        </Card>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
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
                <Col md={12}>
                  <UploadImage
                    label="Thumbnail:"
                    imageLink={
                      !isEmpty(formData)
                        ? urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + formData.thumbnail
                        : image && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image
                    }
                    setImage={setImage}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Label for="exampleCheck" check>
                    Free
                  </Label>
                  <FormGroup className="form-check">
                    <Input
                      id="isFree"
                      name="isFree"
                      type="checkbox"
                      value={isFree}
                      onChange={(e) => setisFree(!isFree)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <Label for="exampleCheck" check>
                    Default
                  </Label>
                  <FormGroup className="form-check">
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.isDefault : ''}
                      name="isDefault"
                      id="isDefault"
                      type="checkbox"
                      value={isDefault}
                      onChange={(e) => setDefault(!isDefault)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              {
                !!isFree && <Row className="mg-bottom-20">
                  <Col md={6}>
                    <Label for="exampleCheck" check>
                      giá
                    </Label>
                    <FormGroup className="form-check">
                      {/* <Input
                        defaultValue={!isEmpty(formData) ? formData.price : ''}
                        type="number"
                        name="price"
                        id="price"
                        placeholder="Enter Price"
                        innerRef={register({
                          required: 'This is required.',
                        })}
                        className={classNames({ 'border-danger': errors.name })}
                      /> */}

                      <Input
                        defaultValue={!isEmpty(formData) ? formData.price : ''}
                        value={textFrice}
                        onChange={(e) => settextFrice(e.target.value)}
                        type="select" name="price" id="price">
                        <option value="0">lưa chọn giá</option>
                        <option value="5000">5000đ</option>
                        <option value="10000">10000đ</option>
                        <option value="20000">20000đ</option>
                        <option value="50000">50000đ</option>
                        <option value="100000">100000đ</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              }

              <Row className="mg-bottom-20">
                <Col md={6}>
                  {/* Input Tag */}
                  <Label for="categories">Categories:</Label>
                  <Select
                    isMulti
                    name="categories"
                    value={selectedCategories}
                    options={categoriesOption}
                    onChange={handleChangeCategories}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </Col>
              </Row>


              <Row className="mg-bottom-20">
                <Col md={6}>
                  {/* Input Tag */}
                  <Label for="hashtags">Hashtags:</Label>
                  <Select
                    isMulti
                    value={selectedHashtags}
                    name="hashtags"
                    options={hashtags}
                    onChange={handleChangeHashtags}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <Button type="submit" color="primary">
                    {id ? 'Update' : 'Create'}
                  </Button>
                </Col>
                <Col md={1}>
                  <Button className="ml-2" color="secondary" onClick={() => history.push('/sticker')}>
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

export default StickerAdd;
