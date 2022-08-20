import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';

import { Button, Card, CardBody, CardHeader, Col, CustomInput, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as menuApi from '../../api/system';
import * as fileManagerApi from '../../api/fileManger';
import * as urlConfig from '../../api/urlConfig';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import UploadImage from '../common/UploadImage';
import Loader from '../common/Loader';

const MenuIconCreate = () => {
  const history = useHistory();
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm();

  const [menu, setMenu] = useState({});
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(true);

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
    if (!isEmpty(menu)) {
      setImage(menu.icon);
    }
  }, [menu]);

  useEffect(() => {
    if (!isEmpty(formData) && isSubmit) {
      if (id) {
        updateMenu();
      } else {
        createMenu();
      }
    }
  }, [formData, isSubmit]);

  const resetData = () => {
    setLoading(true);
    setMenu({});
    setFormData({});
    setImage('');
  };

  const getDetail = async () => {
    const result = await menuApi.getByIdMenuIcon(id);
    console.log(`result`, result)
    setMenu(result);

    setFormData({ name: result.name, link: result.link, order: result.order, status: result.status, path: result.path });
  };

  const updateMenu = async () => {
    const result = await menuApi.updateMenuIcon(id, formData);
    toast(
      <Fragment>
        <h6>Name: {result.name}</h6>
        <hr />
        <p className="mb-0">Update successfully!</p>
      </Fragment>
    );
    history.push('/menu-icon');
  };

  const createMenu = async () => {
    const result = await menuApi.createMenuIcon(formData);
    toast(
      <Fragment>
        <h6>Name: {result.name}</h6>
        <hr />
        <p className="mb-0">Create successfully!</p>
      </Fragment>
    );
    history.push('/menu-icon');
  };

  const OnSubmit = async (data, e) => {
    let imageResult = null;
    console.log(`data`, data)
    if (image instanceof File) imageResult = await fileManagerApi.uploadImage(image);
    setFormData({ ...data, icon: (imageResult ? imageResult.imageId : image) });
    setIsSubmit(true);
  };
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">{id ? 'Update' : 'Create'} menu</h4>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(OnSubmit)}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Menu</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.name : ''}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter menu name"
                      innerRef={register({
                        required: 'required',
                      })}
                      className={classNames({ 'border-danger': errors.name })}
                    />
                    {errors.name && <span className="text-danger fs--1">{errors.name.message}</span>}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="link"> Link</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.link : ''}
                      type="text"
                      name="link"
                      id="link"
                      placeholder="Enter path"
                      innerRef={register({
                        required: 'required',
                        minLength: {
                          value: 3,
                          message: 'Minimum six word',
                        },
                      })}
                      className={classNames({ 'border-danger': errors.key })}
                    />
                    {errors.key && <span className="text-danger fs--1">{errors.key.message}</span>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
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
                <Col md={3}>
                  <FormGroup>
                    <Label for="order">số thứ tự</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.order : ''}
                      innerRef={register({
                        required: 'required',
                      })}
                      type="number"
                      name="order"
                      id="order"
                      placeholder="Enter order"
                      className={classNames({ 'border-danger': errors.order })}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="path">path</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.path : ''}
                      innerRef={register({
                        required: 'required',
                      })}
                      type="text"
                      name="path"
                      id="path"
                      placeholder="Enter path"
                      className={classNames({ 'border-danger': errors.path })}
                    />
                    {errors.path && <span className="text-danger fs--1">{errors.path.message}</span>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <UploadImage
                    label="Image"
                    imageLink={image && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image}
                    setImage={setImage}
                  />
                </Col>
              </Row>

              <Button type="submit" color="primary">
                {id ? 'Update' : 'Create'}
              </Button>
              <Button className="ml-2" color="secondary" onClick={() => history.push('/menu')}>
                Cancel
              </Button>
            </Form>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default MenuIconCreate;
