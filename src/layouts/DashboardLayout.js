import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
// import Dashboard from '../components/dashboard/Dashboard';
// import DashboardAlt from '../components/dashboard-alt/DashboardAlt';
import NavbarTop from '../components/navbar/NavbarTop';
import NavbarVertical from '../components/navbar/NavbarVertical';
import Footer from '../components/footer/Footer';
import loadable from '@loadable/component';
import AppContext from '../context/Context';
import ProductProvider from '../components/e-commerce/ProductProvider';
import SidePanelModal from '../components/side-panel/SidePanelModal';
import { getPageName } from '../helpers/utils';
import PrivateRoute from "../routes/PrivateRoute";

const DashboardRoutes = loadable(() => import('./DashboardRoutes'));

const DashboardLayout = ({ location }) => {
  const { isFluid, isVertical, navbarStyle } = useContext(AppContext);

  const isKanban = getPageName('kanban');

  useEffect(() => {
    DashboardRoutes.preload();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={isFluid || isKanban ? 'container-fluid' : 'container'}>
      {isVertical && <NavbarVertical isKanban={isKanban} navbarStyle={navbarStyle} />}
      <ProductProvider>
        <div className="content">
          <NavbarTop />
          <Switch>
            {/* <Route path="/" exact component={Dashboard} />
            <Route path="/dashboard-alt" exact component={DashboardAlt} /> */}
            <PrivateRoute>
                <DashboardRoutes />
            </PrivateRoute>
          
          </Switch>
          {!isKanban && <Footer />}
        </div>
        <SidePanelModal path={location.pathname} />
      </ProductProvider>
    </div>
  );
};

DashboardLayout.propTypes = { location: PropTypes.object.isRequired };

export default DashboardLayout;
