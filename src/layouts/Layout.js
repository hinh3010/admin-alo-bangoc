import React, { useEffect,useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';

import DashboardLayout from './DashboardLayout';
import ErrorLayout from './ErrorLayout';
import * as notiApi from '../api/notification'
import AppContext from '../context/Context'
import useSocket from '../../src/hooks/useSocket'
import {getProfile} from '../services/storages/userStorage'

import loadable from '@loadable/component';
const AuthBasicLayout = loadable(() => import('./AuthBasicLayout'));
const Landing = loadable(() => import('../components/landing/Landing'));
const WizardLayout = loadable(() => import('../components/auth/wizard/WizardLayout'));
const AuthCardRoutes = loadable(() => import('../components/auth/card/AuthCardRoutes'));
const AuthSplitRoutes = loadable(() => import('../components/auth/split/AuthSplitRoutes'));

const Layout = () => {
const userProfile  = getProfile()
  //const socket = useSocket();

  useEffect(() => {
    AuthBasicLayout.preload();
    Landing.preload();
    WizardLayout.preload();
    AuthCardRoutes.preload();
    AuthSplitRoutes.preload();
    getListNoti();
    //socket.init(userProfile?._id);
  }, []);


  const { setlistNoti,socketId } = useContext(AppContext);

  console.log(`socketId3333`, socketId)


  const getListNoti =async ()=>{
    const resp = await notiApi.getListNoti()
    if(resp){
      setlistNoti(resp.data)
    }
  }


  return (
    <Router fallback={<span />}>
      <Switch>
        {/* <Route path="/landing" exact component={Landing} />
        <Route path="/authentication/card" component={AuthCardRoutes} />
        <Route path="/authentication/split" component={AuthSplitRoutes} />
        <Route path="/authentication/wizard" component={WizardLayout} /> */}
        <Route path="/errors" component={ErrorLayout} />
        <Route path="/login" component={AuthBasicLayout} />
        <Route component={DashboardLayout} />
      </Switch>
      <ToastContainer transition={Fade} closeButton={<CloseButton />} position={toast.POSITION.BOTTOM_LEFT} />
    </Router>
  );
};

export default Layout;
