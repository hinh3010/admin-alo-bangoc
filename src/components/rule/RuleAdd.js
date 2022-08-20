import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row,CustomInput} from 'reactstrap';
import * as fileManagerApi from '../../api/fileManger';
import * as RuleApi from '../../api/system';
import { getListPostCategory } from '../../api/post';
import Loader from '../common/Loader';
import QuillEditor from '../common/QuillEditor';
import './Styles.css';

const RuleAdd = () => {
  const [Rule, setRule] = useState({});
  const history = useHistory();
  const { id } = useParams('');
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [content, setContent] = useState('');

  

  useEffect(() => {
    if (id) {
      getDetail();
    } else {
      resetData();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    if (!isEmpty(formData) && isSubmit) {
      if (id) {
        updateRule();
      } else {
        createRule();
      }
    }
  }, [formData, isSubmit]);

  useEffect(() => {
    getRuleList();
  }, []);

  const handleDrop = acceptedFiles => {
    acceptedFiles.map(file => {
      uploadFile(file);
    });
  };

  const resetData = () => {
    setLoading(true);
    setRule({});
    setFormData({});
    setImage('');
    setItems([]);
  };

  const getDetail = async () => {
    console.log('RUNNNNNNNN GET DETAIL');
    const hashtagResult = [];
    const cateResult = [];
    const result = await RuleApi.detail(id);
    console.log('RESULT: ', result);
 
    setSelectedHashtags(hashtagResult);
    setRule(result);
    setContent(result.data.content)
    setFormData({ title: result.data.title, content: result.data.content,order: result.data.order});
  };

  const updateRule = async () => {
    console.log(`formData`, formData);
    const result = await RuleApi.updatePolicy(id, formData);
    toast(
      <Fragment>
        <h6>Name: {result.name}</h6>
        <hr />
        <p className="mb-0">Update successfully!</p>
      </Fragment>
    );
    history.push('/Rule');
  };


  // const handleChangeHashtags = selectedOptions => {
  //   if (selectedOptions != null) {
  //     let hashtagsResult = [];
  //     selectedOptions.forEach(element => {
  //       const hashtagsObject = { value: '', label: '' };
  //       hashtagsObject.value = element.value;
  //       hashtagsObject.label = element.label;
  //       hashtagsResult.push(hashtagsObject);
  //     });
  //     setSelectedHashtags(hashtagsResult);
  //   }
  //   if (selectedOptions == null) {
  //     setSelectedHashtags([]);
  //   }
  // };

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
   console.log('data', data);
    setFormData({
      ...data,
    content
    });
    setIsSubmit(true);
  };

  // const deleteItemImage = value => {
  //   items.splice(value, 1);
  //   setItems([...items]);
  // };

  const createRule = async () => {
    console.log('RUNN CREATE Rule');
    console.log('formData', formData);
    const result = await RuleApi.createPolicy(formData);
    toast(
      <Fragment>
        <h6>Name: {result.name}</h6>
        <hr />
        <p className="mb-0">Create successfully!</p>
      </Fragment>
    );
    history.push('/rule');
  };


  const getRuleList = async () => {
    const data = await getListPostCategory(0, 1000);
    console.log('Data: ', data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // console.log('Categories', data.items);
    setCategories(data.items);
  };


  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">{id ? 'Cập nhât' : 'Tạo mới'} Chính sách</h4>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(OnSubmit)}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="title">Rule name</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.title : ''}
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter Rule name"
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
                <Col md={6}>
                  <FormGroup>
                    <Label for=""> status</Label>
                    <CustomInput
                      innerRef={register({
                        required: 'required',
                      })}
                      type="select"
                      id="status"
                      value={!isEmpty(formData) ? formData.status : true}
                      onChange={({ target }) => {
                        setFormData({ ...formData, status: target.value });
                      }}
                      name="status"
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Disable</option>
                    </CustomInput>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <CardBody className="p-0">
                  <QuillEditor value={content ?? ''} onChange={setContent} style={{ height: 300, marginBottom: 80 }} />
                </CardBody>
              </Row>
              <Col md={6}>
                  <FormGroup>
                    <Label for="title">Thứ tự</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.order : ''}
                      type="number"
                      name="order"
                      id="order"
                      placeholder="Enter Rule name"
                      className={classNames({ 'border-danger': errors.order })}
                    />
                    {errors.order && <span className="text-danger fs--1">{errors.order.message}</span>}
                  </FormGroup>
                </Col>
              <Row>
                <Col md={1}>
                  <Button type="submit" color="primary">
                    {id ? 'Update' : 'Create'}
                  </Button>
                </Col>
                <Col md={1}>
                  <Button className="ml-2" color="secondary" onClick={() => history.push('/Rule')}>
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

export default RuleAdd;
