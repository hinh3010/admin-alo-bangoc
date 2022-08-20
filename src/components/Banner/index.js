import React, { createRef, Fragment, useEffect, useState, createContext, useContext } from 'react';
import { useHistory, useLocation, useRouteMatch, Link, Route } from 'react-router-dom';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { toast } from 'react-toastify';


import {
  Badge,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form
} from 'reactstrap';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../common/Avatar';
import * as bgApi from '../../api/backgroundChat';
import * as urlConfig from '../../api/urlConfig';
import { getPaginationArray } from '../../helpers/utils';
import axios from 'axios';
import { getToken } from '../../services/storages/userStorage';

import './Styles.css';
import { set } from 'lodash';
import Select from 'react-select';
import Loader from '../common/Loader';
const ItemsContext = createContext();
const DetailContext = createContext();

const Banner = () => {
  const location = useLocation();
  const [bgList, setBgList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const history = useHistory();
  let table = createRef();
  const [showItem, setShowItem] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [type, setType] = useState('');

  const valueType = [
    { value: 'ALL', label: 'All' },
    { value: 'WEB', label: 'Web' },
    { value: 'APP', label: 'App' },
  ]

  const handleChangeType = value => {
    console.log(value.value);
    setType(value);
    getBgListWithType(value.value);
  };

  useEffect(() => {
    getBannerList();
  }, [])

  const getBannerList = async () => {
    setLoading(true);
    const token = getToken();
    const resp = await axios({
      method: 'GET',
      url: `${urlConfig.BANNER}?limit=1000000&offset=0`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (resp.data.data) {
      setBannerList(resp?.data?.data);
    }
    setLoading(false);
    console.log(resp.data.data);
  }

  const deleteBanner = async (id) => {
    const token = getToken();
    const resp = await axios({
      method: 'DELETE',
      url: `${urlConfig.BANNER}/${id}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    getBannerList();
  }

  const getBgList = async () => {
    setLoading(true);
    const data = await bgApi.getBgList();
    console.log((data));
    setBgList(data);
    setLoading(false);
    return data;
  };
  const getBgListWithType = async (type) => {
    setLoading(true);
    const data = await bgApi.getBgListWithType(type);
    console.log((data));
    setBgList(data);
    setLoading(false);
    return data;
  };

  const deleteBg = async (id) => {
    const data = await bgApi.deleteBg(id);
    if (type === '') {
      getBgList();
    }
    else if (type !== '') {
      getBgListWithType(type);
    }
    return data;
  }

  const imageFormatter = image => {
    return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image} />;
  };

  const positionFormatter = position => {
    return <p>{position.position}</p>;
  }

  const actionFormatter = () => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2" style={{ zIndex: '1000' }}>
        <DropdownItem onClick={() => { history.push(`/banner/update/${id}`) }} >
          Edit
        </DropdownItem>

        <DropdownItem onClick={() => {
          deleteBanner(id);
          toast(
            <Fragment>
              <p className="mb-0">Delete successfully!</p>
            </Fragment>
          );
        }} className="text-danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const columns = [
    {
      dataField: 'order',
      text: 'Order',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
    },
    {
      dataField: 'imageId',
      headerClasses: 'border-0',
      text: 'Banner',
      classes: 'border-0 py-2 align-middle',
      formatter: imageFormatter,
    },
    {
      dataField: 'position',
      headerClasses: 'border-0',
      text: 'Position',
      classes: 'border-0 py-2 align-middle',
      formatter: positionFormatter,
    },
    {
      dataField: '',
      headerClasses: 'border-0',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: actionFormatter,
      align: 'right',
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setId(row._id);
          console.log(row._id);
        }
      }
    }
  ];

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Banner List" light={false}>
        <Row>
          <ButtonIcon
            className="mr-1"
            onClick={() => history.push('/banner/add')}
            icon="plus"
            transform="shrink-3 down-2"
            color="falcon-default"
            size="sm"
          >
            New
          </ButtonIcon>
        </Row>
      </FalconCardHeader>

      <CardBody className="p-2">
        {false ? (
          <Loader />
        ) : (
          <>
            <Row>
              <Col sm="12">
                <div className="table-responsive">
                  <BootstrapTable
                    ref={table}
                    bootstrap4
                    keyField="_id"
                    data={bannerList}
                    columns={columns}
                    bordered={false}
                    classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                    headerClasses="bg-200 text-900 border-y border-200"
                    rowClasses="btn-reveal-trigger border-top border-200"
                    pagination={paginationFactory({ sizePerPage: 10 })}
                  />
                </div>
              </Col>
            </Row>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default Banner;
