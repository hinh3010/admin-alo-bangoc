import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, CustomInput, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as loginAPI from '../../api/login';
import withRedirect from '../../hoc/withRedirect';
import { setProfileLists } from "../../services/storages/userStorage";
import AppContext from '../../context/Context'
const LoginForm = ({ setRedirect, hasLabel, layout }) => {
  // State
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const {setsocketId} = useContext(AppContext)

  // Handler

  useEffect(() => {
    setIsDisabled(!username || !password);
  }, [username, password]);
  

  useEffect(() => {
    // localStorage.clear();
  }, []);
  const setStorage = (username, token, user) => {
    const lists = [
        { key: 'username', value: username },
        { key: 'token', value: token },
        { key: 'user', value: user },
    ];
    setProfileLists(lists);
};

  const  handleSubmit = (e) => {
    // stop here if form is invalid
    e.preventDefault();
    loginAPI.login(username,password).then((data) => {
        console.log(data.data);
        const { token, user } = data.data.data;

        if (data.data.code && data.data.code !== 1) {
            return;
        }
      

        if (user && token) {
          //  setsocketId(user?._id)
            setStorage(username, token, user);
            window.location.replace('/');
        }
    })
        .catch((error) => {
          return;
        });
  
}

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>Tài khoản</Label>}
        <Input
          placeholder={!hasLabel ? 'Tài khoản' : ''}
          value={username}
          onChange={({ target }) => setusername(target.value)}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>Mật khẩu</Label>}
        <Input
          placeholder={!hasLabel ? 'Password' : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </FormGroup>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <CustomInput
            id="customCheckRemember"
            label="Remember me"
            checked={remember}
            onChange={({ target }) => setRemember(target.checked)}
            type="checkbox"
          />
        </Col>
        <Col xs="auto">
          <Link className="fs--1" to={`/authentication/${layout}/forget-password`}>
            Forget Password?
          </Link>
        </Col>
      </Row>
      <FormGroup>
        <Button color="primary" block className="mt-3"  >
          Log in
        </Button>
      </FormGroup>
      {/* <Divider className="mt-4">or log in with</Divider> */}
      {/* <SocialAuthButtons /> */}
    </Form>
  );
};

LoginForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'basic',
  hasLabel: false
};

export default withRedirect(LoginForm);
