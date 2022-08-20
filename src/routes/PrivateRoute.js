import React, { lazy } from 'react';
import propTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { getToken } from '../services/storages/userStorage';
// import routes from "../routes";

// const AdminLayout = lazy(() => import('../layouts/Layout'));

const PrivateRoute = ({ component, path, exact, children }) => {
  // const condition = getToken();
  const condition = true;
  if (condition) {
    return children;
  } else {
    return (
      <Route>
        <Redirect to={{ pathname: '/login' }} />;
      </Route>
    )
  }

};

PrivateRoute.propTypes = {
  component: propTypes.func,
  path: propTypes.string,
  exact: propTypes.bool,
};

export default PrivateRoute;
