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
import * as SystemApi from '../../api/system';
import * as urlConfig from '../../api/urlConfig';
import Loader from '../common/Loader';
import paginationFactory from 'react-bootstrap-table2-paginator';

const MenuIconList = () => {
  const [badgeList, setMenuIconList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [totalMenuIcon, setTotalMenuIcon] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  let table = createRef();

  useEffect(() => {
    getMenuIconList();
  }, []);
  useEffect(() => {
    getMenuIconList();
  }, [currentPage]);

  const statusFormatter = (dataField, { _id, status }) => {
    return (
      <Badge onClick={() => handleChangeStatus(_id, status)} className="btn" color={status ? 'success' : 'secondary'}>
        {status ? 'Active' : 'Disable'}
      </Badge>
    );
  };
  const imageFormatter = (image) => {
    return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image} />;
  };

  const actionFormatter = (dataField, { _id }) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => history.push(`/menu-icon/update/${_id}`)}>Edit</DropdownItem>
        <DropdownItem onClick={() => deleteMenuIcon(_id)} className="text-danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const columns = [
    {
      dataField: 'order',
      headerClasses: 'border-0',
      text: 'STT',
      classes: 'border-0 py-2 align-middle',
      sort: true,
    },
    {
      dataField: 'icon',
      headerClasses: 'border-0',
      text: 'Image',
      classes: 'border-0 py-2 align-middle',
      formatter: imageFormatter,
    },
    {
      dataField: 'name',
      text: 'Name',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      sort: true,
    },
    {
      dataField: 'path',
      headerClasses: 'border-0',
      text: 'Path',
      classes: 'border-0 py-2 align-middle',
      sort: true,
    },
    {
      dataField: 'link',
      headerClasses: 'border-0',
      text: 'Link',
      classes: 'border-0 py-2 align-middle',
      sort: true,
    },
    // {
    //   dataField: 'status',
    //   headerClasses: 'border-0',
    //   text: 'Status',
    //   classes: 'border-0 py-2 align-middle',
    //   formatter: statusFormatter,
    //   sort: true,
    // },
    {
      dataField: '',
      headerClasses: 'border-0',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: actionFormatter,
      align: 'right',
    },
  ];

  const deleteMenuIcon = async (id) => {
    if (window.confirm('Are you sure delete this badge?')) {
      const result = await SystemApi.deleteMenuIcon(id);
      getMenuIconList();
    }
  }

  const getMenuIconList = async () => {
    const data = await SystemApi.getListMenuIcon((currentPage - 1) * limit, limit, keyword);
    setTotalMenuIcon(data.total);
    setMenuIconList(data.items);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const searchMenuIcon = async (e) => {
    if (e.key === 'Enter') {
      if (keyword) {
        getMenuIconList();
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
      const result = await SystemApi.changeStatusMenuIcon(data);
      getMenuIconList();
    }
  };

  return (
    <Card className="mb-3">
      <FalconCardHeader title="MenuIcon list" light={false}>
        <Fragment>
          <Row>
            <ButtonIcon
              className="mr-1"
              onClick={() => history.push('/menu-icon/create')}
              icon="plus"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
            >
              New
            </ButtonIcon>
            <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
              Export
            </ButtonIcon>
          </Row>
        </Fragment>
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
                    classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                    headerClasses="bg-200 text-900 border-y border-200"
                    rowClasses="btn-reveal-trigger border-top border-200"
                    bootstrap4
                    keyField="_id"
                    data={badgeList}
                    columns={columns}
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

export default MenuIconList;
