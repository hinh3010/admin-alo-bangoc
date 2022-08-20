import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';

import { Button, Card, CardBody, CardHeader, Col, CustomInput, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as reactionActivityApi from '../../api/reactionActivity';
import * as fileManagerApi from '../../api/fileManger';
import * as urlConfig from '../../api/urlConfig';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import UploadImage from '../common/UploadImage';
import Loader from '../common/Loader';

const ReactionActivityEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm();

  const [reactionActivity, setReactionActivity] = useState({});
  const [formData, setFormData] = useState({});
  const [icon, setIcon] = useState('');
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
    if (!isEmpty(reactionActivity)) {
      setIcon(reactionActivity.icon);
    }
  }, [reactionActivity]);

  useEffect(() => {
    if (!isEmpty(formData) && isSubmit) {
      if (id) {
        updateReactionActivity();
      } else {
        createReactionActivity();
      }
    }
  }, [formData, isSubmit]);

  const resetData = () => {
    setLoading(true);
    setReactionActivity({});
    setFormData({});
    setIcon('');
  };

  const getDetail = async () => {
    const result = await reactionActivityApi.detail(id);
    setReactionActivity(result);
    setFormData({ name: result.name, key: result.key, status: result.status });
  };

  const updateReactionActivity= async () => {
    const result = await reactionActivityApi.update(id, formData);
    toast(
      <Fragment>
        <h6>Message success</h6>
        <hr />
        <p className="mb-0">Update successfully!</p>
      </Fragment>
    );
    history.push('/reaction-activity');
  };

  const createReactionActivity = async () => {
    const result = await reactionActivityApi.create(formData);
    toast(
      <Fragment>
        <h6>Message success</h6>
        <hr />
        <p className="mb-0">Create successfully!</p>
      </Fragment>
    );
    history.push('/reaction-activity');
  };

  const OnSubmit = async (data, e) => {
    let iconResult = null;
    if (icon instanceof File) iconResult = await fileManagerApi.uploadImage(icon);
    setFormData({ ...data, icon: (iconResult ? iconResult.imageId : icon) });
    setIsSubmit(true);
  };
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">{id ? 'Update' : 'Create'} reaction activity</h4>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(OnSubmit)}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Reaction activity name</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.name : ''}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter back ground post name"
                      innerRef={register({
                        required: 'required',
                        minLength: {
                          value: 2,
                          message: 'Minimum two word',
                        },
                      })}
                      className={classNames({ 'border-danger': errors.name })}
                    />
                    {errors.name && <span className="text-danger fs--1">{errors.name.message}</span>}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="key">Reaction activity key</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.key : ''}
                      type="text"
                      name="key"
                      id="key"
                      placeholder="Enter reaction activity key"
                      innerRef={register({
                        required: 'required',
                        minLength: {
                          value: 2,
                          message: 'Minimum two word',
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
                    <Label for="status">Reaction activity status</Label>
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
                <Col md={12}>
                  <UploadImage
                    label="Icon"
                    imageLink={icon && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + icon}
                    setImage={setIcon}
                  />
                </Col>
              </Row>

              <Button type="submit" color="primary">
                {id ? 'Update' : 'Create'}
              </Button>
              <Button className="ml-2" color="secondary" onClick={() => history.push('/reaction-activity')}>
                Cancel
              </Button>
            </Form>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ReactionActivityEdit;
