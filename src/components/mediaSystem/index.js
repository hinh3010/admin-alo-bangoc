import React, { createRef, Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paginations from '../common/Paginations';
import Avatar from '../common/Avatar';
import * as mediaSystemApi from '../../api/mediaSystem';
import * as urlConfig from '../../api/urlConfig';
import Loader from '../common/Loader';

const MediaSystems = () => {
  const [mediaSystemList, setMediaSystemList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [totalMediaSystem, setTotalMediaSystem] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  let table = createRef();

  useEffect(() => {
    getMediaSystemList();
  }, []);
  useEffect(() => {
    getMediaSystemList();
  }, [currentPage]);

  const statusFormatter = (dataField, { _id, status }) => {
    return (
      <Badge onClick={() => handleChangeStatus(_id, status)} className="btn" color={status ? 'success' : 'secondary'}>
        {status ? 'Active' : 'Disable'}
      </Badge>
    );
  };
  const backgroundProfileFormatter = (background_profile) => {
    return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + background_profile} />;
  };

  const backgroundGroupFormatter = (background_group) => {
    return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + background_group} />;
  };

  const actionFormatter = (dataField, { _id }) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => history.push(`/media-system/update/${_id}`)}>Edit</DropdownItem>
        <DropdownItem onClick={() => deleteMediaSystem(_id)} className="text-danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const columns = [
    {
      dataField: '_id',
      headerClasses: 'border-0',
      text: 'Image',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'background_profile',
      text: 'Background Profile',
      formatter: backgroundProfileFormatter,
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      sort: true,
    },
    {
      dataField: 'background_group',
      headerClasses: 'border-0',
      text: 'Background Group',
      formatter: backgroundGroupFormatter,
      classes: 'border-0 py-2 align-middle',
      sort: true,
    },
    {
      dataField: 'status',
      headerClasses: 'border-0',
      text: 'Status',
      classes: 'border-0 py-2 align-middle',
      formatter: statusFormatter,
      sort: true,
    },
    {
      dataField: '',
      headerClasses: 'border-0',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: actionFormatter,
      align: 'right',
    },
  ];

  const deleteMediaSystem = async (id) => {
    if (window.confirm('Are you sure delete this media system?')) {
      const result = await mediaSystemApi.remove(id);
      getMediaSystemList();
    }
  }

  const getMediaSystemList = async () => {
    const data = await mediaSystemApi.getList((currentPage - 1) * limit, limit, keyword);
    setTotalMediaSystem(data.total);
    setMediaSystemList(data.items);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const searchMediaSystem = async (e) => {
    if (e.key === 'Enter') {
      if (keyword) {
        getMediaSystemList();
        setCurrentPage(1);
      }
    }
  };

  const handleChangeStatus = async (id, status) => {
    const data = {
      id,
      status: !status,
    };
    if (window.confirm('Are you sure change status?')) {
      const result = await mediaSystemApi.changeStatus(data);
      getMediaSystemList();
    }
  };

  console.log(mediaSystemList);

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Media system list" light={false}>
        <Fragment>
          <Row>
            <ButtonIcon
              className="mr-1"
              onClick={() => history.push('/media-system/create')}
              icon="plus"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
            >
              New
            </ButtonIcon>
          </Row>
        </Fragment>
      </FalconCardHeader>
      <CardBody className="p-2">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row>
              <Col sm="12">
                <div className="table-responsive">
                  <BootstrapTable
                    ref={table}
                    classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                    headerClasses="bg-200 text-900 border-y border-200"
                    rowClasses="btn-reveal-trigger border-top border-200"
                    bootstrap4
                    keyField="_id"
                    data={mediaSystemList}
                    columns={columns}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Paginations
                  className="mt-2"
                  totalRecords={totalMediaSystem}
                  pageLimit={limit}
                  pageNeighbours={1}
                  onPageChanged={setCurrentPage}
                />
              </Col>
            </Row>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default MediaSystems;
