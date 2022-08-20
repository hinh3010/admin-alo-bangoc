import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as userApi from '../../api/users';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';

const UserUpdate = () => {
  const { id } = useParams();
  const { register, handleSubmit, errors, watch } = useForm();

  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    if (!isEmpty(formData)) {
      updateUser();
    }
  }, [formData]);
  const getDetail = async () => {
    const result = await userApi.detail(id);
    setUser(result);
  };

  const updateUser = async () => {
    const result = await userApi.update(id, formData);
    console.log('result__', result);
    toast(
      <Fragment>
        <h6>Name: {result.first_name + ' ' + result.last_name}</h6>
        <hr />
        <p className="mb-0">Update successfully!</p>
      </Fragment>
    );
  };

  const OnSubmit = (data, e) => {
    setFormData(data);
  };
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">Update user</h4>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={7}>
              <Form onSubmit={handleSubmit(OnSubmit)}>
                <Input
                  type="hidden"
                  name="userId"
                  id="userId"
                  defaultValue={id}
                  innerRef={register({
                    required: 'required',
                  })}
                />
                <FormGroup>
                  <Label for="first_name">First name</Label>
                  <Input
                    defaultValue={!isEmpty(user) ? user.first_name : ''}
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="Enter your first name"
                    innerRef={register({
                      required: 'required',
                      minLength: {
                        value: 2,
                        message: 'Minimum two word',
                      },
                    })}
                    className={classNames({ 'border-danger': errors.first_name })}
                  />
                  {errors.first_name && <span className="text-danger fs--1">{errors.first_name.message}</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="last_name">Last name</Label>
                  <Input
                    defaultValue={!isEmpty(user) ? user.last_name : ''}
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Enter your last name"
                    innerRef={register({
                      required: 'required',
                      minLength: {
                        value: 2,
                        message: 'Minimum two word',
                      },
                    })}
                    className={classNames({ 'border-danger': errors.last_name })}
                  />
                  {errors.last_name && <span className="text-danger fs--1">{errors.last_name.message}</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    defaultValue={!isEmpty(user) ? user.email : ''}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Enter your email"
                    className={classNames({ 'border-danger': errors.email })}
                    innerRef={register({
                      required: 'Email is required',
                      pattern: {
                        value:
                          /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
                        message: 'Email must be valid',
                      },
                    })}
                  />
                  {errors.email && <span className="text-danger fs--1">{errors.email.message}</span>}
                </FormGroup>
                <Button type="submit" color="primary">
                  Update
                </Button>
              </Form>
            </Col>
            {/* <Col md="auto">
              <h5 className="mt-4">Result</h5>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </Col> */}
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UserUpdate;
